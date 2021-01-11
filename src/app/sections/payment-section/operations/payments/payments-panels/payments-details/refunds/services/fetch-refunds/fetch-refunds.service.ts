import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RefundSearchResult } from '@dsh/api-codegen/capi';
import { RefundSearchService, RefundsSearchParams } from '@dsh/api/search';

import { FetchResult, PartialFetcher } from '../../../../../../../../partial-fetcher';

@Injectable()
export class FetchRefundsService extends PartialFetcher<RefundSearchResult, RefundsSearchParams> {
    private readonly searchLimit = 3;

    constructor(private refundSearchService: RefundSearchService) {
        super();
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
