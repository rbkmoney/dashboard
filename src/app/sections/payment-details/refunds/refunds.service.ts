import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RefundSearchService } from '../../../api/search';
import { RefundSearchResult } from '../../../api-codegen/capi';
import { PartialFetcher, FetchResult } from '../../partial-fetcher';
import { RefundsSearchParams } from './refunds-search-params';

@Injectable()
export class RefundsService extends PartialFetcher<RefundSearchResult, RefundsSearchParams> {
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
            invoiceID,
            paymentID,
            this.searchLimit,
            continuationToken
        );
    }
}
