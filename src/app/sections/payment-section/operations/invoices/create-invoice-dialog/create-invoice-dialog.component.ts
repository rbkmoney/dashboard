import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-create-invoice-dialog',
    templateUrl: 'create-invoice-dialog.component.html',
    styleUrls: ['create-invoice-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateInvoiceDialogComponent {}
