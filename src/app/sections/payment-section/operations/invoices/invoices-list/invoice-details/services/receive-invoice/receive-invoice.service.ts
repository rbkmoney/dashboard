import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { Invoice } from '../../../../../../../../api-codegen/capi';
import { InvoiceService } from '../../../../../../../../api/invoice';

@UntilDestroy()
@Injectable()
export class ReceiveInvoiceService {
    isLoading$: Observable<boolean>;
    errorOccurred$: Observable<boolean>;
    invoice$: Observable<Invoice>;

    private receiveInvoice$ = new Subject<string>();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject<boolean>();
    private receivedInvoice$ = new ReplaySubject<Invoice>(1);

    constructor(private invoiceService: InvoiceService) {
        this.isLoading$ = this.loading$.asObservable();
        this.errorOccurred$ = this.error$.asObservable();
        this.invoice$ = this.receivedInvoice$.asObservable();
        this.receiveInvoice$
            .pipe(
                tap(() => this.loading$.next(true)),
                switchMap((invoiceID: string) =>
                    this.invoiceService.getInvoiceByID(invoiceID).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.loading$.next(false);
                            this.error$.next();
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error'),
                map((r) => r as Invoice),
                untilDestroyed(this)
            )
            .subscribe((invoice: Invoice) => {
                this.loading$.next(false);
                this.receivedInvoice$.next(invoice);
            });
    }

    receivePayment(invoiceID: string) {
        this.receiveInvoice$.next(invoiceID);
    }
}
