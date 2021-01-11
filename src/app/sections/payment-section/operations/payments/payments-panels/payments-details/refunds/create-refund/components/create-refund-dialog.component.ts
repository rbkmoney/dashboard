import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import isEmpty from 'lodash.isempty';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Account, RefundParams } from '@dsh/api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '@dsh/app/sections/tokens';
import { ErrorService, NotificationService } from '@dsh/app/shared/services';
import { amountValidator } from '@dsh/components/form-controls';

import { toMajor, toMinor } from '../../../../../../../../../../utils';
import { AccountsService } from '../services/accounts/accounts.service';
import { RefundsService } from '../services/refunds/refunds.service';
import { CreateRefundDialogData } from '../types/create-refund-dialog-data';
import { CreateRefundDialogResponse } from '../types/create-refund-dialog-response';
import { CreateRefundForm } from '../types/create-refund-form';

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
    account$: Observable<Account>;

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
        const { shopID } = this.dialogData;

        this.account$ = this.accountService.getAccount(shopID);
    }

    confirm(): void {
        const params = this.formatRefundParams();
        const { invoiceID, paymentID } = this.dialogData;

        this.refundsService
            .createRefund(invoiceID, paymentID, params)
            .pipe(take(1))
            .subscribe(
                () => {
                    this.notificationService.success(
                        this.transloco.translate('refunds.createRefund.successful', null, 'payment-details')
                    );
                    this.dialogRef.close(CreateRefundDialogResponse.SUCCESS);
                },
                (err: unknown) => {
                    this.errorService.error(err);
                    this.dialogRef.close(CreateRefundDialogResponse.ERROR);
                }
            );
    }

    decline(): void {
        this.dialogRef.close(CreateRefundDialogResponse.CANCELED);
    }

    togglePartialRefund(value: boolean): void {
        this.isPartialRefund = value;

        if (value) {
            this.addAmountControl();
        } else {
            this.removeAmountControl();
        }
    }

    private formatRefundParams(): RefundParams {
        const { reason, amount = null } = this.form.value;
        const amountNum = Number(amount);
        const params: RefundParams = {
            reason,
            currency: this.dialogData.currency,
        };

        if (!isEmpty(amount) && !isNaN(amountNum)) {
            params.amount = toMinor(amountNum);
        }

        return params;
    }

    private addAmountControl(): void {
        this.form.addControl(
            'amount',
            this.fb.control(null, [
                Validators.required,
                amountValidator,
                Validators.min(1),
                Validators.max(toMajor(this.dialogData.maxRefundAmount)),
            ])
        );
    }

    private removeAmountControl(): void {
        // TODO: fix this hack
        setTimeout(() => {
            this.form.removeControl('amount');
        }, 0);
    }
}
