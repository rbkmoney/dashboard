import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

import { InlineResponse2003, RefundSearchResult } from '../../../../api/capi/swagger-codegen';
import { RefundSearchFormValue } from './search-form/refund-search-form-value';
import { refundSearchConverter } from './refund-search-converter';
import { RefundSearchParams } from '../../../../search/refund-search-params';

@Component({
    selector: 'dsh-refunds',
    templateUrl: 'refunds.component.html',
    styleUrls: ['refunds.component.scss']
})
export class RefundsComponent {
    displayedColumns: string[] = ['amount', 'status', 'createdAt', 'invoiceID', 'paymentID', 'reason', 'actions'];
    dataSource: MatTableDataSource<RefundSearchResult> = new MatTableDataSource(null);
    localeBaseDir = 'sections.operations.refunds';
    lastContinuationToken: string;
    lastRefundSearchFormValue: RefundSearchFormValue;
    lastUpdated: Date;
    limit = 20;

    kek: (keke: RefundSearchParams, continuationToken?: string) => Observable<InlineResponse2003> = () =>
        new Observable(subscriber => {
            subscriber.next({
                result: [],
                continuationToken: Math.random().toString()
            });
            subscriber.complete();
        });

    search(searchFormValue: RefundSearchFormValue, token?: string) {
        this.lastRefundSearchFormValue = searchFormValue;
        this.kek(refundSearchConverter(searchFormValue, this.limit), token).subscribe(r => {
            const { continuationToken, result } = r;
            this.lastContinuationToken = r.continuationToken ? continuationToken : null;
            this.dataSource.data = result;
            this.updateLastUpdated();
        });
    }

    showMore() {
        this.kek(
            refundSearchConverter(this.lastRefundSearchFormValue, this.limit),
            this.lastContinuationToken
        ).subscribe(r => {
            const { continuationToken, result } = r;
            this.lastContinuationToken = continuationToken;
            this.dataSource.data = this.dataSource.data.concat(result);
            this.updateLastUpdated();
        });
    }

    refresh() {
        this.search(this.lastRefundSearchFormValue);
    }

    private updateLastUpdated() {
        this.lastUpdated = new Date();
    }
}
