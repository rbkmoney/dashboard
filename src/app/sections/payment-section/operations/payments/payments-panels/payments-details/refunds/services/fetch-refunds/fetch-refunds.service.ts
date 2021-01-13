import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RefundSearchResult } from '@dsh/api-codegen/capi';
import { RefundSearchService, RefundsSearchParams } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

import { FetchResult, PartialFetcher } from '../../../../../../../../partial-fetcher';
import { DEBOUNCE_ACTION_TIME } from '../../../../../consts';

// TODO: remove this disable after making partial fetcher with injectable debounce time
/* tslint:disable:no-unused-variable */
@Injectable()
export class FetchRefundsService extends PartialFetcher<RefundSearchResult, RefundsSearchParams> {
    constructor(
        private refundSearchService: RefundSearchService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(DEBOUNCE_ACTION_TIME)
        private debounceActionTime: number
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
