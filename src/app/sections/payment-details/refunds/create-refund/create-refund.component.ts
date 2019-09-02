import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import round from 'lodash.round';
import { Observable } from 'rxjs';

import { LAYOUT_GAP } from '../../../constants';
import { CreateRefundService } from './create-refund.service';
import { amountValidator } from '../../../../validators';
import { Account, RefundParams } from '../../../../api-codegen/capi/swagger-codegen';

export interface CreateRefundData {
    shopID: string;
    invoiceID: string;
    paymentID: string;
    refundMaxAmount: number;
}

@Component({
    selector: 'dsh-create-refund',
    templateUrl: './create-refund.component.html',
    providers: [CreateRefundService]
})
export class CreateRefundComponent implements OnInit {
    localePath = 'sections.paymentDetails.refunds.createRefund';

    form = this.fb.group({
        reason: ['']
    });

    isPartialRefund = false;

    account$: Observable<Account>;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        @Inject(MAT_DIALOG_DATA) public createRefundData: CreateRefundData,
        private dialogRef: MatDialogRef<CreateRefundComponent>,
        private fb: FormBuilder,
        private createRefundService: CreateRefundService
    ) {}

    ngOnInit() {
        this.account$ = this.createRefundService.getAccount(this.createRefundData.shopID);
    }

    decline() {
        this.dialogRef.close();
    }

    confirm() {
        const { reason, amount } = this.form.getRawValue();
        const params: RefundParams = {
            reason,
            amount: this.createRefundService.getMinorAmountFromString(amount),
            currency: 'RUB'
        };
        this.createRefundService
            .createRefund(this.createRefundData.invoiceID, this.createRefundData.paymentID, params)
            .pipe(take(1))
            .subscribe(() => {
                this.dialogRef.close();
            });
    }

    onCheckboxChange(value: boolean) {
        this.isPartialRefund = value;
        if (value) {
            this.form.addControl(
                'amount',
                this.fb.control('', [
                    Validators.required,
                    amountValidator,
                    Validators.min(1),
                    Validators.max(round(this.createRefundData.refundMaxAmount / 100, 2))
                ])
            );
        } else {
            this.form.removeControl('amount');
        }
    }
}
