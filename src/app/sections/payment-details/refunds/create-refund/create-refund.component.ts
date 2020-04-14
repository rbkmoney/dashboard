import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import round from 'lodash.round';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { amountValidator } from '@dsh/components/form-controls';

import { Account, RefundParams } from '../../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../../constants';
import { CreateRefundService } from './create-refund.service';

export interface CreateRefundData {
    shopID: string;
    invoiceID: string;
    paymentID: string;
    maxRefundAmount: number;
}

@Component({
    selector: 'dsh-create-refund',
    templateUrl: './create-refund.component.html',
    providers: [CreateRefundService]
})
export class CreateRefundComponent implements OnInit {
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
            currency: 'RUB'
        };
        if (amount) {
            params.amount = this.createRefundService.getMinorAmountFromString(amount);
        }
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
                    Validators.max(round(this.createRefundData.maxRefundAmount / 100, 2))
                ])
            );
        } else {
            this.form.removeControl('amount');
        }
    }
}
