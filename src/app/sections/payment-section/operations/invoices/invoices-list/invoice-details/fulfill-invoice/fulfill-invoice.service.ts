import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FulfillInvoiceDialogComponent } from './components/cancel-invoice-dialog/fulfill-invoice-dialog.component';
import { InvoiceService } from '@dsh/api/invoice';
import { filter, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FulfillInvoiceParams } from './types/fulfill-invoice-params';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class FulfillInvoiceService {
    private fulfillInvoice$ = new Subject<FulfillInvoiceParams>();
    private invoiceFulfilled$ = this.fulfillInvoice$.pipe(
        switchMap(({ invoiceID, reason }) => this.invoiceService.fulfillInvoice(invoiceID, reason))
    );

    constructor(
        private invoiceService: InvoiceService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.invoiceFulfilled$.subscribe(() => {
            this.snackBar.open(this.transloco.translate('invoices.actions.invoiceFulfilled', null, 'operations'), 'OK');
        });
    }

    fulfillInvoice(invoiceID: string): void {
        this.dialog
            .open(FulfillInvoiceDialogComponent, {
                width: '720px',
                maxHeight: '90vh',
                disableClose: true,
            })
            .afterClosed()
            .pipe(filter((value) => value !== 'cancel'))
            .subscribe((reason) => {
                this.fulfillInvoice$.next({ invoiceID, reason });
            });
    }
}
