import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { PaymentSearchFormValue } from './search-form/payment-search-form-value';
import { PaymentSearchService } from '../../../../search';
import { PaymentSearchResult } from '../../../../api/capi/swagger-codegen';

@Injectable()
export class PaymentsService {
    private payments$ = new BehaviorSubject<PaymentSearchResult[]>([]);
    private lastContinuationToken: string;
    private hasMorePayments$ = new BehaviorSubject<boolean>(false);
    private lastPaymentSearchFormValue: PaymentSearchFormValue;
    private limit = 20;

    constructor(private paymentSearchService: PaymentSearchService) {}

    loadPayments(searchFormValue = this.lastPaymentSearchFormValue) {
        this.lastPaymentSearchFormValue = searchFormValue;
        this.paymentSearchService
            .searchPayments(
                searchFormValue.fromTime.utc().format(),
                searchFormValue.toTime.utc().format(),
                searchFormValue,
                this.limit
            )
            .subscribe(({ continuationToken, result }) => {
                this.hasMorePayments$.next(!!continuationToken);
                this.lastContinuationToken = continuationToken;
                this.payments$.next(result);
            });
    }

    loadMore() {
        const searchFormValue = this.lastPaymentSearchFormValue;
        this.paymentSearchService
            .searchPayments(
                searchFormValue.fromTime.utc().format(),
                searchFormValue.toTime.utc().format(),
                searchFormValue,
                this.limit,
                this.lastContinuationToken
            )
            .subscribe(({ continuationToken, result }) => {
                this.hasMorePayments$.next(!!continuationToken);
                this.lastContinuationToken = continuationToken;
                this.payments$.next(this.payments$.getValue().concat(result));
            });
    }

    payments(): Observable<PaymentSearchResult[]> {
        return this.payments$.asObservable();
    }

    hasMorePayments(): Observable<boolean> {
        return this.hasMorePayments$.asObservable();
    }
}
