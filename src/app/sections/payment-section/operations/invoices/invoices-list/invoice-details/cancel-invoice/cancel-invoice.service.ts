import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { InvoiceService } from '@dsh/api/invoice';

import { CancelInvoiceDialogComponent } from './components/cancel-invoice-dialog/cancel-invoice-dialog.component';

@Injectable()
export class CancelInvoiceService {
    constructor(
        private invoiceService: InvoiceService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    cancelInvoice(invoiceID: string): Observable<void> {
        const invoiceCancelled$ = new ReplaySubject<void>(1);
        this.dialog
            .open(CancelInvoiceDialogComponent, {
                width: '720px',
            })
            .afterClosed()
            .pipe(
                take(1),
                filter((value) => value !== 'cancel'),
                switchMap((reason) => this.invoiceService.rescindInvoice(invoiceID, reason))
            )
            .subscribe(() => {
                invoiceCancelled$.next();
                this.snackBar.open(
                    this.transloco.translate('invoices.actions.invoiceCancelled', null, 'operations'),
                    'OK',
                    { duration: 2000 }
                );
            });
        return invoiceCancelled$;
    }
}
