import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PartialFetcher, FetchResult } from '../../partial-fetcher';
import { PaymentSearchResult } from '../../../api-codegen/anapi/swagger-codegen';
import { PaymentSearchFormValue } from '../../payment-section/operations/payments/search-form';
import { PaymentSearchService } from '../../../api/search';

@Injectable()
export class PaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    private readonly searchLimit = 3;

    constructor(private route: ActivatedRoute, private paymentSearchService: PaymentSearchService) {
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
