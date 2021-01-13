import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay, take, withLatestFrom } from 'rxjs/operators';

import { Account, Refund, RefundParams } from '@dsh/api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '@dsh/app/sections/tokens';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';
import { amountValidator } from '@dsh/components/form-controls';
import { toMajor, toMinor } from '@dsh/utils';

import { AccountsService } from '../../services/accounts/accounts.service';
import { RefundsService } from '../../services/refunds/refunds.service';
import { Balance } from '../../types/balance';
import { CreateRefundDialogData } from '../../types/create-refund-dialog-data';
import { CreateRefundDialogResponse } from '../../types/create-refund-dialog-response';
import { CreateRefundDialogResponseStatus } from '../../types/create-refund-dialog-response-status';
import { CreateRefundForm } from '../../types/create-refund-form';
import { RefundAvailableSum } from '../../types/refund-available-sum';
import { maxAvailableAmountValidator } from '../../validators/max-available-amount-validator';

@Component({
    selector: 'dsh-create-refund',
    templateUrl: 'create-refund-dialog.component.html',
    providers: [AccountsService, RefundsService],
})
export class CreateRefundDialogComponent implements OnInit {
    form: FormGroup<CreateRefundForm> = this.fb.group({
        reason: [''],
    });

    isPartialRefund = false;
    availableRefundAmount$: Observable<Balance>;
    amountControl: FormControl<number>;

    balance$: Observable<RefundAvailableSum>;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        @Inject(MAT_DIALOG_DATA) private dialogData: CreateRefundDialogData,
        private dialogRef: MatDialogRef<CreateRefundDialogComponent, CreateRefundDialogResponse>,
        private fb: FormBuilder,
        private refundsService: RefundsService,
        private accountService: AccountsService,
        private transloco: TranslocoService,
        private notificationService: NotificationService,
        private errorService: ErrorService
    ) {}

    ngOnInit(): void {
        this.initAvailableRefundAmount();
        this.initBalance();
    }

    confirm(): void {
        const params = this.formatRefundParams();
        const { invoiceID, paymentID } = this.dialogData;

        this.refundsService
            .createRefund(invoiceID, paymentID, params)
            .pipe(withLatestFrom(this.availableRefundAmount$), take(1))
            .subscribe(
                ([refund, { amount }]: [Refund, Balance]) => {
                    this.notificationService.success(
                        this.transloco.translate('refunds.createRefund.successful', null, 'payment-details')
                    );
                    this.dialogRef.close({
                        status: CreateRefundDialogResponseStatus.SUCCESS,
                        availableAmount: amount - refund.amount,
                    });
                },
                (err: unknown) => {
                    this.handleResponseError(err);
                    this.dialogRef.close({
                        status: CreateRefundDialogResponseStatus.ERROR,
                    });
                }
            );
    }

    decline(): void {
        this.dialogRef.close({
            status: CreateRefundDialogResponseStatus.CANCELED,
        });
    }

    togglePartialRefund(value: boolean): void {
        this.isPartialRefund = value;

        if (value) {
            this.addAmountControl();
        } else {
            this.removeAmountControl();
        }
    }

    private initAvailableRefundAmount(): void {
        const { invoiceID, paymentID, maxRefundAmount, currency } = this.dialogData;

        this.availableRefundAmount$ = this.refundsService.getRefundedAmountSum(invoiceID, paymentID).pipe(
            map((refundedSum: number) => maxRefundAmount - refundedSum),
            map((amount: number) => {
                return {
                    amount,
                    currency,
                };
            }),
            shareReplay(1)
        );
    }

    private initBalance(): void {
        const { shopID } = this.dialogData;

        const account$: Observable<Balance> = this.accountService.getAccount(shopID).pipe(
            map((account: Account) => {
                return {
                    amount: account.availableAmount,
                    currency: account.currency,
                };
            }),
            shareReplay(1)
        );

        this.balance$ = combineLatest([account$, this.availableRefundAmount$]).pipe(
            map(([accountBalance, refundedAmount]: [Balance, Balance]) => {
                return {
                    accountBalance,
                    refundedAmount,
                };
            })
        );
    }

    private formatRefundParams(): RefundParams {
        const { reason, amount = null } = this.form.value;
        const { currency } = this.dialogData;
        const params: RefundParams = {
            reason,
            currency,
        };

        if (!isNil(amount) && !isNaN(amount)) {
            params.amount = toMinor(amount);
        }

        return params;
    }

    private addAmountControl(): void {
        this.form.addControl(
            'amount',
            this.fb.control(null, {
                validators: [Validators.required, amountValidator, Validators.min(1)],
                asyncValidators: [
                    maxAvailableAmountValidator(
                        this.balance$.pipe(
                            map(
                                ({
                                    refundedAmount: { amount: refundedAmount },
                                    accountBalance: { amount: accountBalance },
                                }: RefundAvailableSum) => {
                                    return refundedAmount >= accountBalance ? accountBalance : refundedAmount;
                                }
                            ),
                            map(toMajor)
                        )
                    ),
                ],
            })
        );
        this.updateAmountControl();
    }

    private removeAmountControl(): void {
        this.form.removeControl('amount');
        this.updateAmountControl();
    }

    private updateAmountControl(): void {
        const { amount = null } = this.form.controls;
        this.amountControl = amount;
    }

    private handleResponseError(err: unknown | Error): void {
        if (err instanceof HttpErrorResponse && !isEmpty(err.error?.code)) {
            this.notificationService.error(
                this.transloco.translate(`refunds.errors.${err.error.code}`, null, 'payment-details')
            );
            return;
        }
        this.errorService.error(err);
    }
}
