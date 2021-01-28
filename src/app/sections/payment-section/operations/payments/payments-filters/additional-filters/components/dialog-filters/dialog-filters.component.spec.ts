import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { deepEqual, instance, mock, verify } from 'ts-mockito';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { ButtonModule } from '@dsh/components/buttons';

import { AdditionalFilters } from '../../types/additional-filters';
import { MainFiltersComponent } from '../main-filters/main-filters.component';
import { DialogFiltersComponent } from './dialog-filters.component';

describe('DialogFiltersComponent', () => {
    let component: DialogFiltersComponent;
    let fixture: ComponentFixture<DialogFiltersComponent>;
    let mockMatDialogRef: MatDialogRef<DialogFiltersComponent, AdditionalFilters>;

    beforeEach(() => {
        mockMatDialogRef = mock(MatDialogRef);
    });

    async function createComponent(data: Partial<AdditionalFilters> = {}) {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                getTranslocoModule(),
                BaseDialogModule,
                FlexLayoutModule,
                ButtonModule,
                MatIconTestingModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            declarations: [DialogFiltersComponent, MainFiltersComponent, MatIcon],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        ...data,
                    },
                },
                {
                    provide: MatDialogRef,
                    useFactory: () => instance(mockMatDialogRef),
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DialogFiltersComponent);
        component = fixture.componentInstance;
    }

    describe('creation', () => {
        it('should create', async () => {
            await createComponent();
            fixture.detectChanges();

            expect(component).toBeTruthy();
        });

        it('should create using provided mat dialog data', async () => {
            await createComponent({
                payerEmail: 'ada@ada',
                customerID: 'customerID',
                rrn: '1234',
            });
            fixture.detectChanges();

            expect(component.filtersData).toEqual({
                payerEmail: 'ada@ada',
                customerID: 'customerID',
                rrn: '1234',
            });
        });
    });

    describe('mainFilters', () => {
        it('should parse mainFilters data from filtersData and return it', async () => {
            await createComponent({
                payerEmail: 'ada@ada',
                customerID: 'mine',
                rrn: '1234',
            });
            fixture.detectChanges();

            expect(component.mainFilters).toEqual({
                payerEmail: 'ada@ada',
                customerID: 'mine',
                rrn: '1234',
            });
        });

        it('should return mainFilters partially from filtersData and use defaults for non-met properties', async () => {
            await createComponent({
                rrn: '1234',
            });
            fixture.detectChanges();

            expect(component.mainFilters).toEqual({
                payerEmail: '',
                customerID: '',
                rrn: '1234',
            });
        });

        it('should return only defaults if mainFilters does not exist on filtersData', async () => {
            await createComponent({});
            fixture.detectChanges();

            expect(component.mainFilters).toEqual({
                payerEmail: '',
                customerID: '',
                rrn: '',
            });
        });
    });

    describe('clear', () => {
        it('should reset all filtersData', async () => {
            await createComponent({
                payerEmail: 'ada@ada',
                customerID: 'mine',
                rrn: '1234',
            });
            fixture.detectChanges();

            component.clear();

            expect(component.filtersData).toEqual({});
        });
    });

    describe('close', () => {
        const INIT_DATA = {
            payerEmail: 'ada@ada',
            customerID: 'mine',
            rrn: '1234',
        };

        beforeEach(async () => {
            await createComponent(INIT_DATA);
            fixture.detectChanges();
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should close dialog with initial data', () => {
            component.close();

            verify(mockMatDialogRef.close(deepEqual(INIT_DATA))).once();
        });

        it('should ignore changes in filtersData', () => {
            component.filtersData = {
                payerEmail: 'pop@pop',
                customerID: 'mine',
                rrn: '0987',
            };

            component.close();

            verify(mockMatDialogRef.close(deepEqual(INIT_DATA))).once();
        });
    });

    describe('confirm', () => {
        const INIT_DATA = {
            payerEmail: 'ada@ada',
            customerID: 'mine',
            rrn: '1234',
        };

        beforeEach(async () => {
            await createComponent(INIT_DATA);
            fixture.detectChanges();
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should close dialog with filtersData', () => {
            component.confirm();

            verify(mockMatDialogRef.close(deepEqual(component.filtersData))).once();
        });

        it('should ignore initial data after filtersData changed', () => {
            component.filtersData = {
                payerEmail: 'pop@pop',
                customerID: 'mine',
                rrn: '0987',
            };

            component.confirm();

            verify(
                mockMatDialogRef.close(
                    deepEqual({
                        payerEmail: 'pop@pop',
                        customerID: 'mine',
                        rrn: '0987',
                    })
                )
            ).once();
        });
    });

    describe('mainFiltersChanged', () => {
        const INIT_DATA = {
            payerEmail: 'ada@ada',
            customerID: 'mine',
            rrn: '1234',
        };

        beforeEach(async () => {
            await createComponent(INIT_DATA);
            fixture.detectChanges();
        });

        afterEach(() => {
            expect().nothing();
        });

        it('should merge changes with existing filters data', () => {
            component.mainFiltersChanged({
                payerEmail: 'pop@pop',
            });

            expect(component.filtersData).toEqual({
                payerEmail: 'pop@pop',
                customerID: 'mine',
                rrn: '1234',
            });
        });

        it('should replace all main filters with new filters data', () => {
            component.mainFiltersChanged({
                payerEmail: 'pop@pop',
                customerID: 'customerID',
                rrn: '5678',
            });

            expect(component.filtersData).toEqual({
                payerEmail: 'pop@pop',
                customerID: 'customerID',
                rrn: '5678',
            });
        });
    });
});
