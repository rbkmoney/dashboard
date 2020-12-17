import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { InvoiceService } from '@dsh/api/invoice';

import { FulfillInvoiceDialogComponent } from './components/cancel-invoice-dialog/fulfill-invoice-dialog.component';

@Injectable()
export class FulfillInvoiceService {
    constructor(
        private invoiceService: InvoiceService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    fulfillInvoice(invoiceID: string): Observable<void> {
        const invoiceFulfilled$ = new ReplaySubject<void>(1);
        this.dialog
            .open(FulfillInvoiceDialogComponent, {
                width: '720px',
                maxHeight: '90vh',
                disableClose: true,
            })
            .afterClosed()
            .pipe(
                take(1),
                filter((value) => value !== 'cancel'),
                switchMap((reason) => this.invoiceService.fulfillInvoice(invoiceID, reason))
            )
            .subscribe(() => {
                invoiceFulfilled$.next();
                this.snackBar.open(
                    this.transloco.translate('invoices.actions.invoiceFulfilled', null, 'operations'),
                    'OK'
                );
            });
        return invoiceFulfilled$;
    }
}
