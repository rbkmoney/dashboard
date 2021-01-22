import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl } from '@ngneat/reactive-forms';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { PaymentService } from '@dsh/api/payment';
import { BaseDialogModule, BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { MaxLengthInputModule } from '@dsh/app/shared/components/inputs/max-length-input/max-length-input.module';
import { ErrorService } from '@dsh/app/shared/services';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { FormatInputModule } from '@dsh/components/form-controls';

import { CreateHoldDialogData } from '../../types/create-hold-dialog-data';
import { CreateHoldDialogComponent } from './create-hold-dialog.component';

describe('CreateHoldDialogComponent', () => {
    let component: CreateHoldDialogComponent;
    let fixture: ComponentFixture<CreateHoldDialogComponent>;
    let mockMatDialogRef: MatDialogRef<CreateHoldDialogComponent>;
    let mockPaymentService: PaymentService;
    let mockErrorService: ErrorService;

    beforeEach(() => {
        mockMatDialogRef = mock(MatDialogRef);
        mockPaymentService = mock(PaymentService);
        mockErrorService = mock(ErrorService);
    });

    async function createComponent(dialogData: Partial<CreateHoldDialogData> = {}) {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                getTranslocoModule(),
                BaseDialogModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                MatCheckboxModule,
                MaxLengthInputModule,
                MatFormFieldModule,
                FormatInputModule,
            ],
            declarations: [CreateHoldDialogComponent],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        invoiceID: 'invoiceID',
                        paymentID: 'paymentID',
                        currency: 'USD',
                        maxAllowedAmount: 4000,
                        ...dialogData,
                    },
                },
                {
                    provide: MatDialogRef,
                    useFactory: () => instance(mockMatDialogRef),
                },
                {
                    provide: PaymentService,
                    useFactory: () => instance(mockPaymentService),
                },
                {
                    provide: ErrorService,
                    useFactory: () => instance(mockErrorService),
                },
            ],
        })
            .overrideComponent(CreateHoldDialogComponent, {
                set: {
                    providers: [],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(CreateHoldDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    describe('creation', () => {
        it('should create', async () => {
            await createComponent();
            expect(component).toBeTruthy();
        });
    });

    describe('maxAllowedAmount', () => {
        it('should return majored value of maxAllowedAmount from provided dialog data', async () => {
            await createComponent({
                maxAllowedAmount: 300,
            });
            expect(component.maxAllowedAmount).toBe(3);
        });
    });

    describe('currency', () => {
        it('should return currency from provided dialog data', async () => {
            await createComponent({
                currency: 'RUB',
            });
            expect(component.currency).toBe('RUB');
        });
    });

    describe('amountControl', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should return null if amount control does not exist', () => {
            expect(component.amountControl).toBeNull();
        });

        it('should return control instance if control exist', () => {
            component.togglePartialRefund(true);
            expect(component.amountControl).toBeTruthy();
            expect(component.amountControl instanceof FormControl).toBe(true);
        });
    });

    describe('confirm', () => {
        beforeEach(() => {
            when(
                mockPaymentService.capturePayment(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: 'reason',
                        currency: 'USD',
                    })
                )
            ).thenReturn(cold('(|)'));
        });

        it('should call capture payment using provided data', async () => {
            when(
                mockPaymentService.capturePayment(
                    'myInvoiceId',
                    'myPaymentId',
                    deepEqual({
                        reason: 'myReason',
                        currency: 'USD',
                    })
                )
            ).thenReturn(cold('(|)'));

            await createComponent({
                invoiceID: 'myInvoiceId',
                paymentID: 'myPaymentId',
            });

            component.form.setValue({
                reason: 'myReason',
            });

            component.confirm();

            verify(
                mockPaymentService.capturePayment(
                    'myInvoiceId',
                    'myPaymentId',
                    deepEqual({
                        reason: 'myReason',
                        currency: 'USD',
                    })
                )
            ).once();
            expect().nothing();
        });

        it('should response with success if capturing was successful', async () => {
            const scheduler = getTestScheduler();

            when(
                mockPaymentService.capturePayment(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: 'myReason',
                        currency: 'USD',
                        amount: 50000,
                    })
                )
            ).thenReturn(hot('^--(a|)', { a: null }));

            await createComponent();

            scheduler.run(({ flush }) => {
                component.togglePartialRefund(true);
                component.form.setValue({
                    reason: 'myReason',
                    amount: 500,
                });
                component.confirm();

                flush();

                verify(mockMatDialogRef.close(BaseDialogResponseStatus.SUCCESS)).once();
                expect().nothing();
            });
        });

        it('should response with error if error happened', async () => {
            const scheduler = getTestScheduler();

            when(
                mockPaymentService.capturePayment(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: 'errorReason',
                        currency: 'USD',
                    })
                )
            ).thenReturn(hot('^-#-(|)', {}, new Error('my error')));

            await createComponent();

            scheduler.run(({ flush }) => {
                component.form.setValue({
                    reason: 'errorReason',
                });
                component.confirm();

                flush();

                verify(mockMatDialogRef.close(BaseDialogResponseStatus.ERROR)).once();
                expect().nothing();
            });
        });

        it('should send errors from payment service to error service', async () => {
            const scheduler = getTestScheduler();

            const error = new Error('my error');
            when(
                mockPaymentService.capturePayment(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: 'errorReason',
                        currency: 'USD',
                        amount: 200,
                    })
                )
            ).thenReturn(hot('^-#-(|)', {}, error));

            await createComponent();

            scheduler.run(({ flush }) => {
                component.togglePartialRefund(true);
                component.form.setValue({
                    reason: 'errorReason',
                    amount: 2,
                });
                component.confirm();

                flush();

                verify(mockErrorService.error(deepEqual(error))).once();
                expect().nothing();
            });
        });
    });

    describe('decline', () => {
        it('should response with canceled status', async () => {
            await createComponent();

            component.decline();

            verify(mockMatDialogRef.close(BaseDialogResponseStatus.CANCELED)).once();
            expect().nothing();
        });
    });

    describe('togglePartialRefund', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should add amount control', () => {
            component.togglePartialRefund(true);

            expect(component.form.controls.amount).toBeTruthy();
        });

        it('should remove amount control', () => {
            component.togglePartialRefund(true);
            component.togglePartialRefund(false);

            expect(component.form.controls.amount).toBeFalsy();
        });

        it('should change isPartial value', () => {
            component.togglePartialRefund(true);

            expect(component.isPartial).toBe(true);

            component.togglePartialRefund(false);

            expect(component.isPartial).toBe(false);
        });
    });
});
