import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@ngneat/reactive-forms';

import { CancelInvoiceDialogResponse } from '../../types/cancel-invoice-dialog-response';

@Component({
    templateUrl: 'cancel-invoice-dialog.component.html',
    styleUrls: ['cancel-invoice-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CancelInvoiceDialogComponent {
    constructor(private dialogRef: MatDialogRef<CancelInvoiceDialogComponent, CancelInvoiceDialogResponse>) {}

    reason = new FormControl<string>();

    cancel() {
        this.dialogRef.close('cancel');
    }

    accept() {
        this.dialogRef.close({ reason: this.reason.value });
    }
}
