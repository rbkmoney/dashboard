import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@ngneat/reactive-forms';

import { FulfillInvoiceDialogResponse } from '../../types/fulfill-invoice-dialog-response';

@Component({
    templateUrl: 'fulfill-invoice-dialog.component.html',
    styleUrls: ['fulfill-invoice-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FulfillInvoiceDialogComponent {
    constructor(private dialogRef: MatDialogRef<FulfillInvoiceDialogComponent, FulfillInvoiceDialogResponse>) {}

    reason = new FormControl<string>();

    cancel() {
        this.dialogRef.close('cancel');
    }

    accept() {
        this.dialogRef.close({ reason: this.reason.value });
    }
}
