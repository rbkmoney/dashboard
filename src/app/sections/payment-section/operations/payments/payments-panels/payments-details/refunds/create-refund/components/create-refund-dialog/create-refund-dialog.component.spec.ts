import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl } from '@ngneat/reactive-forms';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { Refund } from '@dsh/api-codegen/capi';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { MaxLengthInputModule } from '@dsh/app/shared/components/inputs/max-length-input/max-length-input.module';
import { CommonError, ErrorService, NotificationService } from '@dsh/app/shared/services';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { ButtonModule } from '@dsh/components/buttons';

import { AccountsService } from '../../services/accounts/accounts.service';
import { RefundsService } from '../../services/refunds/refunds.service';
import { CreateRefundDialogData } from '../../types/create-refund-dialog-data';
import { CreateRefundDialogResponse } from '../../types/create-refund-dialog-response';
import { CreateRefundDialogResponseStatus } from '../../types/create-refund-dialog-response-status';
import { CreateRefundDialogComponent } from './create-refund-dialog.component';

describe('CreateRefundDialogComponent', () => {
    let fixture: ComponentFixture<CreateRefundDialogComponent>;
    let component: CreateRefundDialogComponent;
    let mockMatDialogRef: MatDialogRef<CreateRefundDialogComponent, CreateRefundDialogResponse>;
    let mockRefundsService: RefundsService;
    let mockAccountsService: AccountsService;
    let mockNotificationService: NotificationService;
    let mockErrorService: ErrorService;

    beforeEach(() => {
        mockMatDialogRef = mock(MatDialogRef);
        mockRefundsService = mock(RefundsService);
        mockAccountsService = mock(AccountsService);
        mockNotificationService = mock(NotificationService);
        mockErrorService = mock(ErrorService);
    });

    async function createComponent(dialogData: Partial<CreateRefundDialogData> = {}) {
        await TestBed.configureTestingModule({
            imports: [
                getTranslocoModule(),
                NoopAnimationsModule,
                ReactiveFormsModule,
                MatCheckboxModule,
                MatFormFieldModule,
                MatInputModule,
                ButtonModule,
                FlexLayoutModule,
                BaseDialogModule,
                MaxLengthInputModule,
            ],
            declarations: [CreateRefundDialogComponent],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        shopID: 'shopID',
                        invoiceID: 'invoiceID',
                        paymentID: 'paymentID',
                        currency: 'USD',
                        maxRefundAmount: 2000,
                        ...dialogData,
                    },
                },
                {
                    provide: MatDialogRef,
                    useFactory: () => instance(mockMatDialogRef),
                },
                {
                    provide: RefundsService,
                    useFactory: () => instance(mockRefundsService),
                },
                {
                    provide: AccountsService,
                    useFactory: () => instance(mockAccountsService),
                },
                {
                    provide: NotificationService,
                    useFactory: () => instance(mockNotificationService),
                },
                {
                    provide: ErrorService,
                    useFactory: () => instance(mockErrorService),
                },
            ],
        })
            .overrideComponent(CreateRefundDialogComponent, {
                set: {
                    providers: [],
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(CreateRefundDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    beforeEach(() => {
        when(mockRefundsService.getRefundedAmountSum('invoiceID', 'paymentID')).thenReturn(of(0));
        when(mockAccountsService.getAccount('shopID')).thenReturn(
            of({
                id: 5,
                currency: 'USD',
                availableAmount: 15000,
                ownAmount: 80000,
            })
        );
    });

    describe('creation', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should be created', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('ngOnInit', () => {
        it('should init availableRefundAmount$', async () => {
            when(mockRefundsService.getRefundedAmountSum('invoiceID', 'paymentID')).thenReturn(of(4500));

            await createComponent({
                maxRefundAmount: 8000,
            });

            expect(component.availableRefundAmount$).toBeObservable(
                cold('(a|)', {
                    a: {
                        amount: 3500,
                        currency: 'USD',
                    },
                })
            );
        });

        // it('should init balance$', async () => {
        //     when(mockAccountsService.getAccount('shopID')).thenReturn(
        //         of({
        //             id: 2,
        //             currency: 'USD',
        //             availableAmount: 2000,
        //             ownAmount: 61000,
        //         })
        //     );
        //
        //     await createComponent({
        //         maxRefundAmount: 1000,
        //     });
        //
        //     expect(component.balance$).toBeObservable(
        //         cold('(a|)', {
        //             a: {
        //                 refundedAmount: {
        //                     amount: 1000,
        //                     currency: 'USD',
        //                 },
        //                 accountBalance: {
        //                     amount: 2000,
        //                     currency: 'USD',
        //                 },
        //             },
        //         })
        //     );
        // });
    });

    describe('confirm', () => {
        beforeEach(() => {
            when(
                mockRefundsService.createRefund(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: '',
                        currency: 'USD',
                    })
                )
            ).thenReturn(
                of({
                    id: 'refundID',
                    createdAt: new Date(),
                    amount: 100,
                    currency: 'USD',
                    status: Refund.StatusEnum.Succeeded,
                })
            );
        });

        beforeEach(async () => {
            await createComponent();
        });

        it('should create full refund with no amount', () => {
            when(
                mockRefundsService.createRefund(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: 'my reason',
                        currency: 'USD',
                    })
                )
            ).thenReturn(
                of({
                    id: 'refundID',
                    createdAt: new Date(),
                    amount: 5000,
                    currency: 'USD',
                    status: Refund.StatusEnum.Succeeded,
                })
            );

            component.form.setValue({
                reason: 'my reason',
            });

            component.confirm();

            verify(
                mockRefundsService.createRefund(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: 'my reason',
                        currency: 'USD',
                    })
                )
            ).once();
            expect(component.form.value.amount).toBeUndefined();
        });

        it('should create refund with form amount', () => {
            when(
                mockRefundsService.createRefund(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: 'another reason',
                        currency: 'USD',
                        amount: 3000,
                    })
                )
            ).thenReturn(
                of({
                    id: 'refundID',
                    createdAt: new Date(),
                    amount: 3000,
                    currency: 'USD',
                    status: Refund.StatusEnum.Succeeded,
                })
            );

            component.form.addControl('amount', new FormControl<number>(0));
            component.form.setValue({
                reason: 'another reason',
                amount: 30,
            });

            component.confirm();

            verify(
                mockRefundsService.createRefund(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: 'another reason',
                        currency: 'USD',
                        amount: 3000,
                    })
                )
            ).once();
            expect().nothing();
        });

        it('should notify about success', () => {
            component.confirm();

            verify(mockNotificationService.success('paymentDetails.refunds.createRefund.successful')).once();
            expect().nothing();
        });

        it('should close dialog with success and rest non refunded data', () => {
            when(
                mockRefundsService.createRefund(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: '',
                        currency: 'USD',
                    })
                )
            ).thenReturn(
                of({
                    id: 'refundID',
                    createdAt: new Date(),
                    amount: 750,
                    currency: 'USD',
                    status: Refund.StatusEnum.Succeeded,
                })
            );

            component.confirm();

            verify(
                mockMatDialogRef.close(
                    deepEqual({
                        status: CreateRefundDialogResponseStatus.Success,
                        availableAmount: 1250,
                    })
                )
            ).once();
            expect().nothing();
        });

        it('should handle http error response and notify using code', () => {
            when(
                mockRefundsService.createRefund(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: '',
                        currency: 'USD',
                    })
                )
            ).thenReturn(
                of({
                    id: 'refundID',
                    createdAt: new Date(),
                    amount: 5000,
                    currency: 'USD',
                    status: Refund.StatusEnum.Succeeded,
                }).pipe(
                    switchMap(() => {
                        throw new HttpErrorResponse({
                            error: {
                                code: 'invoicePaymentAmountExceeded',
                            },
                        });
                    })
                )
            );

            component.confirm();

            verify(
                mockErrorService.error(
                    deepEqual(new CommonError('paymentDetails.refunds.errors.invoicePaymentAmountExceeded'))
                )
            ).once();
            expect().nothing();
        });

        it('should use error service if error cannot be parse in component', () => {
            const error = new Error('non parsable error');
            when(
                mockRefundsService.createRefund(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: '',
                        currency: 'USD',
                    })
                )
            ).thenReturn(
                of({
                    id: 'refundID',
                    createdAt: new Date(),
                    amount: 5000,
                    currency: 'USD',
                    status: Refund.StatusEnum.Succeeded,
                }).pipe(
                    switchMap(() => {
                        throw error;
                    })
                )
            );

            component.confirm();

            verify(mockErrorService.error(deepEqual(error))).once();
            expect().nothing();
        });

        it('should close dialog with error status', () => {
            when(
                mockRefundsService.createRefund(
                    'invoiceID',
                    'paymentID',
                    deepEqual({
                        reason: '',
                        currency: 'USD',
                    })
                )
            ).thenReturn(
                of({
                    id: 'refundID',
                    createdAt: new Date(),
                    amount: 5000,
                    currency: 'USD',
                    status: Refund.StatusEnum.Succeeded,
                }).pipe(
                    switchMap(() => {
                        throw new Error('my error');
                    })
                )
            );

            component.confirm();

            verify(
                mockMatDialogRef.close(
                    deepEqual({
                        status: CreateRefundDialogResponseStatus.Error,
                    })
                )
            ).once();
            expect().nothing();
        });
    });

    describe('decline', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should close dialog with canceled status', () => {
            component.decline();

            verify(
                mockMatDialogRef.close(
                    deepEqual({
                        status: CreateRefundDialogResponseStatus.Cancelled,
                    })
                )
            ).once();
            expect().nothing();
        });
    });

    describe('togglePartialRefund', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should toggle isPartialRefund value', () => {
            component.togglePartialRefund(true);

            expect(component.isPartialRefund).toBe(true);

            component.togglePartialRefund(false);

            expect(component.isPartialRefund).toBe(false);
        });

        it('should add amount control to the form', () => {
            expect(component.form.controls.amount).toBeFalsy();

            component.togglePartialRefund(true);

            expect(component.form.controls.amount).toBeTruthy();
        });

        it('should remove amount control to the form', () => {
            component.togglePartialRefund(true);

            expect(component.form.controls.amount).toBeTruthy();

            component.togglePartialRefund(false);

            expect(component.form.controls.amount).toBeFalsy();
        });
    });
});
