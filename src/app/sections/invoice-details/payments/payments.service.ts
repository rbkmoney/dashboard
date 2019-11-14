import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PartialFetcher, FetchResult } from '../../partial-fetcher';
import { PaymentSearchResult } from '../../../api-codegen/anapi/swagger-codegen';
import { PaymentSearchFormValue } from '../../payment-section/operations/payments/search-form';
import { PaymentSearchService } from '../../../api/search';
import { booleanDebounceTime } from '../../../custom-operators';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class PaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    private readonly searchLimit = 3;

    isLoading$: Observable<boolean> = this.doAction$.pipe(
        booleanDebounceTime(),
        shareReplay(1)
    );

    constructor(private paymentSearchService: PaymentSearchService) {
        super();
    }

    protected fetch(
        params: PaymentSearchFormValue,
        continuationToken: string
    ): Observable<FetchResult<PaymentSearchResult>> {
        return this.paymentSearchService.searchPaymentsByDuration(
            { amount: 1, unit: 'y' },
            params,
            this.searchLimit,
            continuationToken
        );
    }
}
