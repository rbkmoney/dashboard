import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';

import { PaymentService } from '@dsh/api/payment';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services';

import { CreateRefundForm } from '../../../../refunds/create-refund/types/create-refund-form';
import { MAX_REASON_LENGTH } from '../../../consts';
import { CancelHoldDialogData } from '../../types/cancel-hold-dialog-data';

@Component({
    selector: 'dsh-cancel-hold-dialog',
    templateUrl: './cancel-hold-dialog.component.html',
    styleUrls: ['./cancel-hold-dialog.component.scss'],
    providers: [PaymentService],
})
export class CancelHoldDialogComponent {
    maxReasonLength: number = MAX_REASON_LENGTH;
    form: FormGroup<CreateRefundForm> = this.fb.group({
        reason: ['', Validators.maxLength(this.maxReasonLength)],
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) private dialogData: CancelHoldDialogData,
        private dialogRef: MatDialogRef<CancelHoldDialogComponent, BaseDialogResponseStatus>,
        private fb: FormBuilder,
        private paymentService: PaymentService,
        private errorService: ErrorService
    ) {}

    confirm(): void {
        const { reason } = this.form.value;
        const { invoiceID, paymentID } = this.dialogData;

        this.paymentService.cancelPayment(invoiceID, paymentID, reason).subscribe(
            () => {
                this.dialogRef.close(BaseDialogResponseStatus.SUCCESS);
            },
            (err: Error) => {
                this.errorService.error(err);
                this.dialogRef.close(BaseDialogResponseStatus.ERROR);
            }
        );
    }

    decline(): void {
        this.dialogRef.close(BaseDialogResponseStatus.CANCELED);
    }
}
