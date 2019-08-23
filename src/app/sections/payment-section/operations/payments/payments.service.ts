import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { PaymentSearchFormValue } from './search-form/payment-search-form-value';
import { PaymentSearchService } from '../../../../search';
import { PaymentSearchResult } from '../../../../api/capi/swagger-codegen';

@Injectable()
export class PaymentsService {
    lastContinuationToken$: BehaviorSubject<string> = new BehaviorSubject(null);

    private payments$ = new BehaviorSubject<PaymentSearchResult[]>([]);
    private hasMorePayments$ = new BehaviorSubject<boolean>(false);
    private lastPaymentSearchFormValue: PaymentSearchFormValue;

    constructor(private paymentSearchService: PaymentSearchService) {}

    loadPayments(
        searchFormValue = this.lastPaymentSearchFormValue,
        limit = 20,
        token = this.lastContinuationToken$.getValue()
    ) {
        this.lastPaymentSearchFormValue = searchFormValue;
        this.paymentSearchService
            .searchPayments(
                searchFormValue.fromTime.utc().format(),
                searchFormValue.toTime.utc().format(),
                searchFormValue,
                limit,
                token
            )
            .subscribe(({ continuationToken, result }) => {
                this.hasMorePayments$.next(!!continuationToken);
                this.lastContinuationToken$.next(continuationToken);
                if (token) {
                    this.payments$.next(this.payments$.getValue().concat(result));
                } else {
                    this.payments$.next(result);
                }

            });
    }

    payments(): Observable<PaymentSearchResult[]> {
        return this.payments$.asObservable();
    }

    hasMorePayments(): Observable<boolean> {
        return this.hasMorePayments$.asObservable();
    }
}
