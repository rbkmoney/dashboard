import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { Invoice } from '../../../../../../api-codegen/capi';
import { InvoiceService } from '../../../../../../api/invoice';

@Injectable()
export class RefundInvoiceInfoService {
    private receiveInvoice$ = new Subject<string>();
    private loading$ = new BehaviorSubject(false);
    private error$ = new Subject();
    private receivedPayment$ = new Subject<Invoice>();

    isLoading$ = this.loading$.asObservable();
    errorOccurred$ = this.error$.asObservable();
    invoice$ = this.receivedPayment$.asObservable();

    constructor(private invoiceService: InvoiceService) {
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
                map((r) => r as Invoice)
            )
            .subscribe((payment: Invoice) => {
                this.loading$.next(false);
                this.receivedPayment$.next(payment);
            });
    }

    receivePayment(invoiceID: string) {
        this.receiveInvoice$.next(invoiceID);
    }
}
