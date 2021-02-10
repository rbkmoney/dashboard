import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
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

import { MainFiltersComponent } from '../../main-filters';
import { PaymentStatusFilterModule } from '../../payment-status-filter';
import { PaymentSumFilterModule } from '../../payment-sum-filter';
import { AdditionalFilters } from '../../types/additional-filters';
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
                MatDividerModule,
                PaymentStatusFilterModule,
                PaymentSumFilterModule,
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

        it('should init paymentSum filters with provided data', async () => {
            await createComponent({
                paymentAmountFrom: 500,
                paymentAmountTo: 600,
            });

            expect(component.paymentSumFiltersGroup.value).toEqual({
                min: '',
                max: '',
            });

            fixture.detectChanges();

            expect(component.paymentSumFiltersGroup.value).toEqual({
                min: '500',
                max: '600',
            });
        });

        it('should init paymentSum filters with provided float numbers', async () => {
            await createComponent({
                paymentAmountFrom: 500.6,
                paymentAmountTo: 600.89,
            });

            expect(component.paymentSumFiltersGroup.value).toEqual({
                min: '',
                max: '',
            });

            fixture.detectChanges();

            expect(component.paymentSumFiltersGroup.value).toEqual({
                min: '500,6',
                max: '600,89',
            });
        });
    });

    describe('filtersGroup', () => {
        beforeEach(async () => {
            await createComponent({
                payerEmail: 'ada@ada',
                customerID: 'mine',
                rrn: '1234',
                paymentStatus: 'pending',
                paymentAmountFrom: 500,
                paymentAmountTo: 800,
            });

            fixture.detectChanges();
        });

        it('should return main filters form group', () => {
            expect(component.mainFiltersGroup instanceof FormGroup).toBe(true);
            expect(component.mainFiltersGroup.value).toEqual({
                payerEmail: 'ada@ada',
                customerID: 'mine',
                rrn: '1234',
            });
        });

        it('should return main filters form group', () => {
            expect(component.statusFilterControl instanceof FormGroup).toBe(true);
            expect(component.statusFilterControl.value).toEqual({
                paymentStatus: 'pending',
            });
        });

        it('should return main filters form group', () => {
            expect(component.paymentSumFiltersGroup instanceof FormGroup).toBe(true);
            expect(component.paymentSumFiltersGroup.value).toEqual({
                min: '500',
                max: '800',
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

        describe('formatting paymentSumFilter data', () => {
            beforeEach(async () => {
                await createComponent({});
                fixture.detectChanges();
            });

            afterEach(() => {
                component.confirm();

                verify(
                    mockMatDialogRef.close(
                        deepEqual({
                            paymentAmountFrom: 500.6,
                            paymentAmountTo: 800.89,
                        })
                    )
                );
                expect().nothing();
            });

            it('should format number data', async () => {
                component.paymentSumFiltersGroup.setValue({
                    min: 500.6,
                    max: 800.89,
                });
            });

            it('should format string data', async () => {
                component.paymentSumFiltersGroup.setValue({
                    min: '500,6',
                    max: '800,89',
                });
            });

            it('should format combined string and numbers data', async () => {
                component.paymentSumFiltersGroup.setValue({
                    min: 500.6,
                    max: '800,89',
                });
            });
        });
    });
});
