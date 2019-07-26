import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { PaymentSearchFormValue } from './search-form/payment-search-form-value';
import { InlineResponse2001, PaymentSearchResult } from '../../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.scss']
})
export class PaymentsComponent {
    displayedColumns: string[] = ['amount', 'status', 'statusChanged', 'invoice', 'attributes', 'actions'];
    dataSource: MatTableDataSource<PaymentSearchResult> = new MatTableDataSource(null);
    localeBaseDir = 'sections.operations.payments';
    lastContinuationToken: string;
    lastPaymentSearchFormValue: PaymentSearchFormValue;
    lastUpdated: Date;

    kek: (keke: PaymentSearchFormValue, continuationToken?: string) => Observable<InlineResponse2001> = () =>
        new Observable(subscriber => {
            subscriber.next({ result: [], continuationToken: Math.random().toString() });
            subscriber.complete();
        });

    search(searchFormValue: PaymentSearchFormValue, token?: string) {
        this.lastPaymentSearchFormValue = searchFormValue;
        this.kek(searchFormValue, token).subscribe(r => {
            const { continuationToken, result } = r;
            this.lastContinuationToken = r.continuationToken ? continuationToken : null;
            this.dataSource.data = result;
            this.updateLastUpdated();
        });
    }

    showMore() {
        this.kek(this.lastPaymentSearchFormValue, this.lastContinuationToken).subscribe(r => {
            const { continuationToken, result } = r;
            this.lastContinuationToken = continuationToken;
            this.dataSource.data = this.dataSource.data.concat(result);
            this.updateLastUpdated();
        });
    }

    refresh() {
        this.search(this.lastPaymentSearchFormValue);
    }

    private updateLastUpdated() {
        this.lastUpdated = new Date();
    }
}
