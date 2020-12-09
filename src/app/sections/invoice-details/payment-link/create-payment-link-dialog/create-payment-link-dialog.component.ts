import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Invoice } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-create-payment-link-dialog',
    templateUrl: 'create-payment-link-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePaymentLinkDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<CreatePaymentLinkDialogComponent, 'cancel'>,
        @Inject(MAT_DIALOG_DATA) public data: { invoice: Invoice }
    ) {}

    cancel() {
        this.dialogRef.close('cancel');
    }
}
