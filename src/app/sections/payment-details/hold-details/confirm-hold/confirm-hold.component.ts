import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { first } from 'rxjs/operators';

import { amountValidator } from '@dsh/components/form-controls';

import { toMajor, toMinor } from '../../../../../utils';
import { CaptureParams } from '../../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../../constants';
import { ConfirmHoldService } from './confirm-hold.service';

export interface ConfirmHoldData {
    invoiceID: string;
    paymentID: string;
    currency: string;
    acceptMaxAmount: number;
}

@Component({
    selector: 'dsh-confirm-hold',
    templateUrl: './confirm-hold.component.html',
    providers: [ConfirmHoldService]
})
export class ConfirmHoldComponent {
    form: FormGroup = this.fb.group({
        reason: ['', [Validators.required]]
    });

    isPartialAccept: boolean;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmHoldData,
        private dialogRef: MatDialogRef<ConfirmHoldComponent>,
        private fb: FormBuilder,
        private acceptHoldService: ConfirmHoldService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    decline() {
        this.dialogRef.close();
    }

    confirm() {
        const { reason, amount } = this.form.getRawValue();
        const params: CaptureParams = {
            reason,
            amount: amount && toMinor(amount),
            currency: amount && this.data.currency
        };
        this.acceptHoldService
            .capturePayment(this.data.invoiceID, this.data.paymentID, params)
            .pipe(first())
            .subscribe(
                () => {
                    this.dialogRef.close();
                },
                () => {
                    this.snackBar.open(this.transloco.translate('commonError'), 'OK', { duration: 3000 });
                    this.dialogRef.close();
                }
            );
    }

    onCheckboxChange(value: boolean) {
        this.isPartialAccept = value;
        if (value) {
            this.form.addControl(
                'amount',
                this.fb.control('', [
                    Validators.required,
                    amountValidator,
                    Validators.min(1),
                    Validators.max(toMajor(this.data.acceptMaxAmount))
                ])
            );
        } else {
            this.form.removeControl('amount');
        }
    }
}
