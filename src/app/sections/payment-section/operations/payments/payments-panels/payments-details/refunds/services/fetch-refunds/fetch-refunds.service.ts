import { Inject, Injectable } from '@angular/core';
import { DEBOUNCE_FETCHER_ACTION_TIME, FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';

import { RefundSearchResult } from '@dsh/api-codegen/capi';
import { RefundSearchService, RefundsSearchParams } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

@Injectable()
export class FetchRefundsService extends PartialFetcher<RefundSearchResult, RefundsSearchParams> {
    constructor(
        private refundSearchService: RefundSearchService,
        @Inject(SEARCH_LIMIT)
        protected searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        debounceActionTime: number
    ) {
        super(debounceActionTime);
    }

    protected fetch(
        { invoiceID, paymentID }: RefundsSearchParams,
        continuationToken: string
    ): Observable<FetchResult<RefundSearchResult>> {
        return this.refundSearchService.searchRefundsByDuration(
            { amount: 3, unit: 'y' },
            {
                invoiceID,
                paymentID,
            },
            this.searchLimit,
            continuationToken
        );
    }
}
