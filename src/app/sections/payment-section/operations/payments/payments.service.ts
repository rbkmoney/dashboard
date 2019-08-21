import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PaymentSearchFormValue } from './search-form/payment-search-form-value';
import { PaymentSearchService } from '../../../../search';
import { PaymentSearchResult } from '../../../../api/capi/swagger-codegen';

@Injectable()
export class PaymentsService {
    lastContinuationToken$: Subject<string> = new Subject();
    private lastContinuationToken: string;
    private lastPaymentSearchFormValue: PaymentSearchFormValue;

    constructor(private paymentSearchService: PaymentSearchService) {}

    getPayments(
        searchFormValue = this.lastPaymentSearchFormValue,
        limit = 20,
        token = this.lastContinuationToken
    ): Observable<Array<PaymentSearchResult>> {
        this.lastPaymentSearchFormValue = searchFormValue;
        return this.paymentSearchService
            .searchPayments(
                searchFormValue.fromTime.utc().format(),
                searchFormValue.toTime.utc().format(),
                searchFormValue,
                limit,
                token
            )
            .pipe(
                tap(({ continuationToken }) => {
                    this.lastContinuationToken = continuationToken;
                    this.lastContinuationToken$.next(this.lastContinuationToken);
                }),
                map(({ result }) => result)
            );
    }
}
