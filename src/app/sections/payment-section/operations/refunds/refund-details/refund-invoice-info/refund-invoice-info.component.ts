import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EMPTY, Observable, ReplaySubject } from 'rxjs';
import { catchError, shareReplay, switchMap, take, tap } from 'rxjs/operators';

import { Invoice } from '../../../../../../api-codegen/capi';
import { InvoiceService } from '../../../../../../api/invoice';

@Component({
    selector: 'dsh-refund-invoice-info',
    templateUrl: 'refund-invoice-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundInvoiceInfoComponent implements OnInit {
    @Input() invoiceID: string;

    private receiveInvoice$ = new ReplaySubject<void>();

    isLoading = false;
    isError = false;

    invoice$: Observable<Invoice> = this.receiveInvoice$.pipe(
        tap(() => (this.isLoading = true)),
        tap(() => console.log('NANI?')),
        switchMap(() => this.invoiceService.getInvoiceByID(this.invoiceID)),
        catchError(() => {
            this.isLoading = false;
            this.isError = true;
            return EMPTY;
        }),
        tap((invoice) => console.log('invoiuce?', invoice)),
        take(1),
        shareReplay(1)
    );

    constructor(private invoiceService: InvoiceService) {}

    ngOnInit() {
        this.receiveInvoice$.next();
        this.invoice$.subscribe(() => (this.isLoading = false));
    }
}
