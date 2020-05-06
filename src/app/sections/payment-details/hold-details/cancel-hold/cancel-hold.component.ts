import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { first } from 'rxjs/operators';

import { PaymentService } from '../../../../api/payment';
import { LAYOUT_GAP } from '../../../constants';

export interface CancelHoldData {
    invoiceID: string;
    paymentID: string;
}

@Component({
    selector: 'dsh-cancel-hold',
    templateUrl: './cancel-hold.component.html',
    providers: [PaymentService]
})
export class CancelHoldComponent {
    form: FormGroup = this.fb.group({
        reason: ['', [Validators.required]]
    });

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        @Inject(MAT_DIALOG_DATA) public data: CancelHoldData,
        private dialogRef: MatDialogRef<CancelHoldComponent>,
        private fb: FormBuilder,
        private paymentService: PaymentService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    decline() {
        this.dialogRef.close(false);
    }

    confirm() {
        const { reason } = this.form.getRawValue();
        this.paymentService
            .cancelPayment(this.data.invoiceID, this.data.paymentID, reason)
            .pipe(first())
            .subscribe(
                () => {
                    this.dialogRef.close(true);
                },
                () => {
                    this.snackBar.open(this.transloco.translate('commonError'), 'OK', { duration: 3000 });
                    this.dialogRef.close(false);
                }
            );
    }
}
