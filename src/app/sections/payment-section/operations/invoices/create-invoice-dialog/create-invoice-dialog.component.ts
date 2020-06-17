import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Invoice, Shop } from '../../../../../api-codegen/capi';

@Component({
    selector: 'dsh-create-invoice-dialog',
    templateUrl: 'create-invoice-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<CreateInvoiceDialogComponent, 'cancel' | 'create'>,
        @Inject(MAT_DIALOG_DATA) public data: { shops$: Observable<Shop[]> },
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
