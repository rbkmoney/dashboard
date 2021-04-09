import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

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
        this.invoice$ = this.invoiceData$.asObservable();
        this.error$ = this.innerErrors$.asObservable();

        this.initInvoiceListener();
    }

    setInvoiceID(invoiceID: string): void {
        this.invoiceId$.next(invoiceID);
    }

    private initInvoiceListener(): void {
        this.invoiceId$
            .pipe(
                distinctUntilChanged(),
                tap(() => {
                    this.resetInvoiceData();
                }),
                switchMap((invoiceID: string) => {
                    return this.invoiceSearchService.getInvoiceByDuration({ amount: 3, unit: 'y' }, invoiceID);
                }),
                untilDestroyed(this)
            )
            .subscribe(
                (invoice: Invoice) => {
                    this.updateInvoiceData(invoice);
                },
                (err: Error) => {
                    this.handleError(err);
                }
            );
    }

    private updateInvoiceData(invoice: Invoice): void {
        this.invoiceData$.next(invoice);
    }

    private resetInvoiceData(): void {
        this.invoiceData$.next(null);
    }

    private handleError(err: Error): void {
        this.innerErrors$.next(err);
        this.errorService.error(err);
    }
}
