import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { RefundSearchResult } from '@dsh/api-codegen/capi/swagger-codegen';
import { RefundSearchService } from '@dsh/api/search';

import { booleanDebounceTime, mapToTimestamp } from '../../../../../../custom-operators';
import { SearchFiltersParams } from '../../refunds-search-filters';

const SEARCH_LIMIT = 10;

@Injectable()
export class FetchRefundsService extends PartialFetcher<RefundSearchResult, SearchFiltersParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(private refundSearchService: RefundSearchService, private route: ActivatedRoute) {
        super();
    }

    protected fetch(params: SearchFiltersParams, continuationToken: string) {
        return this.route.params.pipe(
            pluck('realm'),
            switchMap((paymentInstitutionRealm) =>
                this.refundSearchService.searchRefunds(
                    params.fromTime,
                    params.toTime,
                    {
                        ...params,
                        paymentInstitutionRealm,
                    },
                    SEARCH_LIMIT,
                    continuationToken
                )
            )
        );
    }
}
