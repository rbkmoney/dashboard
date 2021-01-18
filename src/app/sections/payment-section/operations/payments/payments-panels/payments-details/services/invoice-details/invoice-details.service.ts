import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Invoice } from '@dsh/api-codegen/anapi/swagger-codegen';
import { InvoiceSearchService } from '@dsh/api/search';
import { ErrorService } from '@dsh/app/shared/services';

@UntilDestroy()
@Injectable()
export class InvoiceDetailsService {
    invoice$: Observable<Invoice | null>;
    error$: Observable<Error>;

    private invoiceId$ = new ReplaySubject<string>(1);
    private invoiceData$ = new ReplaySubject<Invoice | null>(1);
    private innerErrors$ = new ReplaySubject<Error>(1);

    constructor(private invoiceSearchService: InvoiceSearchService, private errorService: ErrorService) {
        this.initInvoice();
        this.initInvoiceErrors();
    }

    setInvoiceID(invoiceID: string): void {
        this.invoiceId$.next(invoiceID);
    }

    private initInvoice(): void {
        this.invoice$ = this.invoiceData$.asObservable();
        this.invoiceId$
            .pipe(
                distinctUntilChanged(),
                switchMap((invoiceID: string) => {
                    this.invoiceData$.next(null);
                    return this.invoiceSearchService.getInvoiceByDuration({ amount: 3, unit: 'y' }, invoiceID);
                }),
                untilDestroyed(this)
            )
            .subscribe(
                (invoice: Invoice) => {
                    this.invoiceData$.next(invoice);
                },
                (err: Error) => {
                    this.innerErrors$.next(err);
                    this.errorService.error(err);
                });
    }

    private initInvoiceErrors(): void {
        this.error$ = this.innerErrors$.asObservable();
    }
}
