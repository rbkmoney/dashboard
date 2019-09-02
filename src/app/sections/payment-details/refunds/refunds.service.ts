import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RefundSearchService } from '../../../api/search';
import { RefundSearchResult } from '../../../api-codegen/capi';
import { PartialFetcher, FetchResult } from '../../partial-fetcher';
import { RefundsSearchParams } from './refunds-search-params';

@Injectable()
export class RefundsService extends PartialFetcher<RefundSearchResult, RefundsSearchParams> {
    private readonly searchLimit = 3;
export class RefundsService {
    private refunds$: BehaviorSubject<RefundSearchResult[]>;

    private hasMoreRefunds$: BehaviorSubject<boolean>;

    constructor(private refundSearchService: RefundSearchService) {
        super();
    private continuationToken: string;

    constructor(private refundSearchService: RefundSearchService) {}

    initRefunds() {
        this.refunds$ = new BehaviorSubject<RefundSearchResult[]>([]);
        this.hasMoreRefunds$ = new BehaviorSubject<boolean>(false);
        this.continuationToken = undefined;
    }

    loadRefunds(invoiceID: string, paymentID: string) {
        this.refundSearchService
            .searchRefundsByDuration({ amount: 1, unit: 'y' }, invoiceID, paymentID, 3, this.continuationToken)
            .subscribe(({ continuationToken, result }) => {
                this.continuationToken = continuationToken;
                this.hasMoreRefunds$.next(!!continuationToken);
                this.refunds$.next(this.refunds$.getValue().concat(result));
            });
    }

    protected fetch(
        { invoiceID, paymentID }: RefundsSearchParams,
        continuationToken: string
    ): Observable<FetchResult<RefundSearchResult>> {
        return this.refundSearchService.searchRefundsByDuration(
            { amount: 1, unit: 'y' },
            invoiceID,
            paymentID,
            this.searchLimit,
            continuationToken
        );
    }
}
