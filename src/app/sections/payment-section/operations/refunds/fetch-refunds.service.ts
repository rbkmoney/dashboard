import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { RefundSearchResult } from '../../../../api-codegen/capi/swagger-codegen';
import { RefundSearchService } from '../../../../api/search';
import { booleanDebounceTime } from '../../../../custom-operators';
import { PartialFetcher } from '../../../partial-fetcher';
import { mapToTimestamp } from '../operators';
import { SearchFiltersParams } from './refunds-search-filters';

@Injectable()
export class FetchRefundsService extends PartialFetcher<RefundSearchResult, SearchFiltersParams> {
    private readonly SEARCH_LIMIT = 10;

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
                    this.SEARCH_LIMIT,
                    continuationToken
                )
            )
        );
    }
}
