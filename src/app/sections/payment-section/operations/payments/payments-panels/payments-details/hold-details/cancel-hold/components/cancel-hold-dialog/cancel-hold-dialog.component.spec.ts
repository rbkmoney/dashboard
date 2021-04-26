import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { PaymentService } from '@dsh/api/payment';
import { BaseDialogModule, BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { MaxLengthInputModule } from '@dsh/app/shared/components/inputs/max-length-input/max-length-input.module';
import { ErrorService } from '@dsh/app/shared/services';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { CancelHoldDialogData } from '../../types/cancel-hold-dialog-data';
import { CancelHoldDialogComponent } from './cancel-hold-dialog.component';

describe('CancelHoldDialogComponent', () => {
    let component: CancelHoldDialogComponent;
    let fixture: ComponentFixture<CancelHoldDialogComponent>;
    let mockMatDialogRef: MatDialogRef<CancelHoldDialogComponent>;
    let mockPaymentService: PaymentService;
    let mockErrorService: ErrorService;

    beforeEach(() => {
        mockMatDialogRef = mock(MatDialogRef);
        mockPaymentService = mock(PaymentService);
        mockErrorService = mock(ErrorService);
    });

    async function createComponent(dialogData: Partial<CancelHoldDialogData> = {}) {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                getTranslocoModule(),
                BaseDialogModule,
                MaxLengthInputModule,
                ReactiveFormsModule,
                FlexModule,
            ],
            declarations: [CancelHoldDialogComponent],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        invoiceID: 'invoiceID',
                        paymentID: 'paymentID',
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
            .overrideComponent(CancelHoldDialogComponent, {
                set: {
                    providers: [],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(CancelHoldDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    describe('creation', () => {
        it('should create', async () => {
            await createComponent();
            expect(component).toBeTruthy();
        });
    });

    describe('confirm', () => {
        beforeEach(() => {
            when(mockPaymentService.cancelPayment('invoiceID', 'paymentID', 'reason')).thenReturn(cold('(|)'));
        });

        it('should call cancel payment using provided data', async () => {
            when(mockPaymentService.cancelPayment('myInvoiceId', 'myPaymentId', 'myReason')).thenReturn(cold('(|)'));

            await createComponent({
                invoiceID: 'myInvoiceId',
                paymentID: 'myPaymentId',
            });

            component.form.setValue({
                reason: 'myReason',
            });

            component.confirm();

            verify(mockPaymentService.cancelPayment('myInvoiceId', 'myPaymentId', 'myReason')).once();
            expect().nothing();
        });

        it('should response with success if canceling was successful', async () => {
            const scheduler = getTestScheduler();

            when(mockPaymentService.cancelPayment('invoiceID', 'paymentID', 'myReason')).thenReturn(
                hot('^--(a|)', { a: null })
            );

            await createComponent();

            scheduler.run(({ flush }) => {
                component.form.setValue({
                    reason: 'myReason',
                });
                component.confirm();

                flush();

                verify(mockMatDialogRef.close(BaseDialogResponseStatus.Success)).once();
                expect().nothing();
            });
        });

        it('should response with error if error happened', async () => {
            const scheduler = getTestScheduler();

            when(mockPaymentService.cancelPayment('invoiceID', 'paymentID', 'anotherReason')).thenReturn(
                hot('^-#-(|)', {}, new Error('my error'))
            );

            await createComponent();

            scheduler.run(({ flush }) => {
                component.form.setValue({
                    reason: 'anotherReason',
                });
                component.confirm();

                flush();

                verify(mockMatDialogRef.close(BaseDialogResponseStatus.Error)).once();
                expect().nothing();
            });
        });

        it('should send errors from payment service to error service', async () => {
            const scheduler = getTestScheduler();

            const error = new Error('my error');
            when(mockPaymentService.cancelPayment('invoiceID', 'paymentID', 'anotherReason')).thenReturn(
                hot('^-#-(|)', {}, error)
            );

            await createComponent();

            scheduler.run(({ flush }) => {
                component.form.setValue({
                    reason: 'anotherReason',
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

            verify(mockMatDialogRef.close(BaseDialogResponseStatus.Cancelled)).once();
            expect().nothing();
        });
    });
});
