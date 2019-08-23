import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { PaymentSearchFormValue } from './search-form/payment-search-form-value';
import { PaymentSearchService, PaymentsWithToken } from '../../../../search';
import { PaymentSearchResult } from '../../../../api/capi/swagger-codegen';

@Injectable()
export class PaymentsService {
    private payments$ = new BehaviorSubject<PaymentSearchResult[]>([]);
    private hasMorePayments$ = new BehaviorSubject<boolean>(false);

    private continuationToken: string = null;
    private searchValue: PaymentSearchFormValue = null;
    private paymentsAcc: PaymentSearchResult[] = [];

    lastUpdated$: Observable<string> = this.payments$.pipe(
        map(_ =>
            moment()
                .utc()
                .format()
        )
    );

    constructor(private paymentSearchService: PaymentSearchService) {}

    payments(): Observable<PaymentSearchResult[]> {
        return this.payments$.asObservable();
    }

    hasMorePayments(): Observable<boolean> {
        return this.hasMorePayments$.asObservable();
    }

    search(val: PaymentSearchFormValue) {
        this.searchValue = val;
        this.refresh();
    }

    refresh() {
        this.paymentsAcc = [];
        this.continuationToken = null;
        this.showMore();
    }

    showMore() {
        this.broadcastPayments(this.searchValue);
    }

    private broadcastPayments(val: PaymentSearchFormValue) {
        this.reducePayments(val).subscribe(p => {
            this.payments$.next(p);
            this.hasMorePayments$.next(!!this.continuationToken);
        });
    }

    private reducePayments(val: PaymentSearchFormValue): Observable<PaymentSearchResult[]> {
        return this.reduceToken(val).pipe(
            tap(p => (this.paymentsAcc = this.paymentsAcc.concat(p))),
            map(_ => this.paymentsAcc)
        );
    }

    private reduceToken(val: PaymentSearchFormValue): Observable<PaymentSearchResult[]> {
        return this.searchPayments(val, this.continuationToken).pipe(
            tap(({ continuationToken }) => (this.continuationToken = continuationToken)),
            map(({ result }) => result)
        );
    }

    private searchPayments(
        val: PaymentSearchFormValue,
        continuationToken: string,
        limit = 20
    ): Observable<PaymentsWithToken> {
        return this.paymentSearchService.searchPayments(
            val.fromTime.utc().format(),
            val.toTime.utc().format(),
            val,
            limit,
            continuationToken
        );
    }
}
