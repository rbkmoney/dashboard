import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

import { InlineResponse200, Invoice } from '../../../../api/capi/swagger-codegen';
import { InvoiceSearchFormValue } from './search-form/invoice-search-form-value';
import { InvoiceSearchParams } from '../../../../search/invoice-search-params';

@Component({
    selector: 'dsh-invoices',
    templateUrl: 'invoices.component.html',
    styleUrls: ['invoices.component.scss']
})
export class InvoicesComponent {
    displayedColumns: string[] = ['actions'];
    dataSource: MatTableDataSource<Invoice> = new MatTableDataSource(null);
    localeBaseDir = 'sections.operations.invoices';
    lastContinuationToken: string;
    lastInvoiceSearchFormValue: InvoiceSearchFormValue;
    lastUpdated: Date;
    limit = 20;

    kek: (keke: InvoiceSearchParams, continuationToken?: string) => Observable<InlineResponse200> = () =>
        new Observable(subscriber => {
            subscriber.next({
                result: [],
                continuationToken: Math.random().toString()
            });
            subscriber.complete();
        });

    search(searchFormValue: InvoiceSearchFormValue, token?: string) {
        this.lastInvoiceSearchFormValue = searchFormValue;
        this.kek({ ...searchFormValue, limit: this.limit }, token).subscribe(r => {
            const { continuationToken, result } = r;
            this.lastContinuationToken = r.continuationToken ? continuationToken : null;
            this.dataSource.data = result;
            this.updateLastUpdated();
        });
    }

    showMore() {
        this.kek({ ...this.lastInvoiceSearchFormValue, limit: this.limit }, this.lastContinuationToken).subscribe(r => {
            const { continuationToken, result } = r;
            this.lastContinuationToken = continuationToken;
            this.dataSource.data = this.dataSource.data.concat(result);
            this.updateLastUpdated();
        });
    }

    refresh() {
        this.search(this.lastInvoiceSearchFormValue);
    }

    private updateLastUpdated() {
        this.lastUpdated = new Date();
    }
}
