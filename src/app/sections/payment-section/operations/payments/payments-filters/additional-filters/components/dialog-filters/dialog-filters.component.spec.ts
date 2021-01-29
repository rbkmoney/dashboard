import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup } from '@ngneat/reactive-forms';
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

    it('should create', async () => {
        await createComponent();
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should init mainFilters value with provided data', async () => {
            await createComponent({
                payerEmail: 'ada@ada',
                customerID: 'mine',
                rrn: '1234',
            });

            expect(component.mainFiltersGroup.value).toEqual({
                payerEmail: '',
                customerID: '',
                rrn: '',
            });

            fixture.detectChanges();

            expect(component.mainFiltersGroup.value).toEqual({
                payerEmail: 'ada@ada',
                customerID: 'mine',
                rrn: '1234',
            });
        });
    });

    describe('mainFiltersGroup', () => {
        it('should return main filters form group', async () => {
            await createComponent({
                payerEmail: 'ada@ada',
                customerID: 'mine',
                rrn: '1234',
            });
            fixture.detectChanges();

            expect(component.mainFiltersGroup instanceof FormGroup).toBe(true);
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

            expect(component.mainFiltersGroup.value).toEqual({
                payerEmail: null,
                customerID: null,
                rrn: null,
            });
        });
    });

    describe('close', () => {
        it('should close dialog with initial data', async () => {
            await createComponent({
                payerEmail: 'ada@ada',
                customerID: 'customerID',
                rrn: '2413',
            });
            fixture.detectChanges();

            component.mainFiltersGroup.setValue({
                payerEmail: 'pop@pop',
                customerID: 'mine',
                rrn: '1234',
            });

            component.close();

            verify(
                mockMatDialogRef.close(
                    deepEqual({
                        payerEmail: 'ada@ada',
                        customerID: 'customerID',
                        rrn: '2413',
                    })
                )
            );
            expect().nothing();
        });
    });

    describe('confirm', () => {
        it('should close dialog with merged additional data', async () => {
            await createComponent({
                payerEmail: 'ada@ada',
                customerID: 'customerID',
                rrn: '2413',
            });
            fixture.detectChanges();

            component.mainFiltersGroup.setValue({
                payerEmail: 'pop@pop',
                customerID: 'mine',
                rrn: '1234',
            });

            component.confirm();

            verify(
                mockMatDialogRef.close(
                    deepEqual({
                        payerEmail: 'pop@pop',
                        customerID: 'mine',
                        rrn: '1234',
                    })
                )
            );
            expect().nothing();
        });

        it('should remove from additional data invalid and nullable fields', async () => {
            await createComponent({
                payerEmail: 'ada@ada',
                customerID: 'customerID',
                rrn: '2413',
            });
            fixture.detectChanges();

            component.mainFiltersGroup.setValue({
                payerEmail: null,
                customerID: 'mine',
                rrn: '1234aaaa',
            });

            component.confirm();

            verify(
                mockMatDialogRef.close(
                    deepEqual({
                        customerID: 'mine',
                    })
                )
            );
            expect().nothing();
        });
    });
});
