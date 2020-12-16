import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Invoice, Shop } from '@dsh/api-codegen/capi';

import { CreateInvoiceDialogResponse } from '../../types/create-invoice-dialog-response';

@Component({
    selector: 'dsh-create-invoice-dialog',
    templateUrl: 'create-invoice-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<CreateInvoiceDialogComponent, CreateInvoiceDialogResponse>,
        @Inject(MAT_DIALOG_DATA) public shops: Shop[]
    ) {}

    cancel() {
        this.dialogRef.close('cancel');
    }

    create(invoice: Invoice) {
        this.dialogRef.close(invoice);
    }
}
