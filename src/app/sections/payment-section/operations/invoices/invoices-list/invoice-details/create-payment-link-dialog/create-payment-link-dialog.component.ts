import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CreatePaymentLinkDialogData } from './types/create-payment-link-dialog-data';

@Component({
    selector: 'dsh-create-payment-link-dialog',
    templateUrl: 'create-payment-link-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePaymentLinkDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<CreatePaymentLinkDialogComponent, 'cancel'>,
        @Inject(MAT_DIALOG_DATA) public data: CreatePaymentLinkDialogData
    ) {}

    cancel(): void {
        this.dialogRef.close('cancel');
    }
}
