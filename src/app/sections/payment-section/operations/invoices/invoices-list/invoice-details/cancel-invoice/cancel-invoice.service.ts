import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';

import { InvoiceService } from '@dsh/api/invoice';

import { CancelInvoiceDialogComponent } from './components/cancel-invoice-dialog/cancel-invoice-dialog.component';
import { CancelInvoiceParams } from './types/cancel-invoice-params';

@Injectable()
export class CancelInvoiceService {
    private cancelInvoice$ = new Subject<CancelInvoiceParams>();
    invoiceCancelled$ = this.cancelInvoice$.pipe(
        switchMap(({ invoiceID, reason }) => this.invoiceService.rescindInvoice(invoiceID, reason)),
        shareReplay(1)
    );

    constructor(
        private invoiceService: InvoiceService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.invoiceCancelled$.subscribe(() => {
            this.snackBar.open(this.transloco.translate('invoices.actions.invoiceCancelled', null, 'operations'), 'OK');
        });
    }

    cancelInvoice(invoiceID: string): void {
        this.dialog
            .open(CancelInvoiceDialogComponent, {
                width: '720px',
                maxHeight: '90vh',
                disableClose: true,
            })
            .afterClosed()
            .pipe(filter((value) => value !== 'cancel'))
            .subscribe((reason) => {
                this.cancelInvoice$.next({ invoiceID, reason });
            });
    }
}
