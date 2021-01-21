import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Account, RefundParams } from '@dsh/api-codegen/capi/swagger-codegen';
import { amountValidator } from '@dsh/components/form-controls';

import { toMajor, toMinor } from '../../../../../utils';
import { LAYOUT_GAP } from '../../../tokens';
import { CreateRefundService } from './create-refund.service';

export interface CreateRefundData {
    shopID: string;
    invoiceID: string;
    paymentID: string;
    currency: string;
    maxRefundAmount: number;
}

@Component({
    selector: 'dsh-create-refund',
    templateUrl: 'create-refund.component.html',
    providers: [CreateRefundService],
})
export class CreateRefundComponent implements OnInit {
    form = this.fb.group({
        reason: [''],
    });

    isPartialRefund = false;

    account$: Observable<Account>;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        @Inject(MAT_DIALOG_DATA) public createRefundData: CreateRefundData,
        private dialogRef: MatDialogRef<CreateRefundComponent>,
        private fb: FormBuilder,
        private createRefundService: CreateRefundService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
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
            currency: this.createRefundData.currency,
        };
        if (amount) {
            params.amount = toMinor(amount);
        }
        this.createRefundService
            .createRefund(this.createRefundData.invoiceID, this.createRefundData.paymentID, params)
            .pipe(first())
            .subscribe(
                () => {
                    this.snackBar.open(
                        this.transloco.translate('refunds.createRefund.successful', null, 'payment-details'),
                        'OK',
                        { duration: 3000 }
                    );
                    this.dialogRef.close(true);
                },
                () => {
                    this.snackBar.open(this.transloco.translate('commonError'), 'OK', { duration: 3000 });
                    this.dialogRef.close();
                }
            );
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
                    Validators.max(toMajor(this.createRefundData.maxRefundAmount)),
                ])
            );
        } else {
            this.form.removeControl('amount');
        }
    }
}
