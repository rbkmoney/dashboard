import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RefundSearchResult } from '@dsh/api-codegen/capi';
import { RefundSearchService, RefundsSearchParams } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

import {
    DEBOUNCE_FETCHER_ACTION_TIME,
    FetchResult,
    IndicatorsPartialFetcher,
} from '../../../../../../../../partial-fetcher';

@Injectable()
export class FetchRefundsService extends IndicatorsPartialFetcher<RefundSearchResult, RefundsSearchParams> {
    constructor(
        private refundSearchService: RefundSearchService,
        @Inject(SEARCH_LIMIT)
        protected searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        protected debounceActionTime: number
    ) {
        super(searchLimit, debounceActionTime);
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
