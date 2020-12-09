import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Invoice } from '@dsh/api-codegen/capi';

import { CreateInvoiceDialogConfig } from '../../types/create-invoice-dialog-config';
import { CreateInvoiceDialogResponse } from '../../types/create-invoice-dialog-response';

@Component({
    selector: 'dsh-create-invoice-dialog',
    templateUrl: 'create-invoice-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<CreateInvoiceDialogComponent, CreateInvoiceDialogResponse>,
        @Inject(MAT_DIALOG_DATA) public data: CreateInvoiceDialogConfig,
        private router: Router
    ) {}

    cancel() {
        this.dialogRef.close('cancel');
    }

    create({ id }: Invoice) {
        this.dialogRef.close('create');
        this.router.navigate(['invoice', id]);
    }
}
