import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateInvoiceDialogComponent } from './components/create-invoice-dialog/create-invoice-dialog.component';
import { CreateInvoiceDialogConfig } from './types/create-invoice-dialog-config';

@Injectable()
export class CreateInvoiceService {
    constructor(private dialog: MatDialog) {}

    createInvoice(config: CreateInvoiceDialogConfig): void {
        this.dialog.open<CreateInvoiceDialogComponent, CreateInvoiceDialogConfig>(CreateInvoiceDialogComponent, {
            width: '720px',
            maxHeight: '90vh',
            disableClose: true,
            data: config,
        });
    }
}
