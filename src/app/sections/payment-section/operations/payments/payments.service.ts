import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { PaymentSearchFormValue } from './search-form/payment-search-form-value';
import { PaymentSearchService } from '../../../../search';
import { PaymentSearchResult } from '../../../../api/capi';
import { PartialFetcher, FetchResult } from '../../../partial-fetcher';

@Injectable()
export class PaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    private readonly searchLimit = 20;

    lastUpdated$: Observable<string> = this.searchResult$.pipe(
        map(_ =>
            moment()
                .utc()
                .format()
        )
    );

    constructor(private paymentSearchService: PaymentSearchService) {
        super();
    }

    protected fetch(
        params: PaymentSearchFormValue,
        continuationToken: string
    ): Observable<FetchResult<PaymentSearchResult>> {
        return this.paymentSearchService.searchPayments(
            params.fromTime.utc().format(),
            params.toTime.utc().format(),
            params,
            this.searchLimit,
            continuationToken
        );
    }
}
