import { Inject, Injectable } from '@angular/core';
import { PartialFetcher } from '@rbkmoney/partial-fetcher';
import isEmpty from 'lodash-es/isEmpty';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { InlineResponse20013, Report } from '@dsh/api-codegen/anapi';
import { ReportsService as ReportsApiService } from '@dsh/api/reports';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';

import { SearchFiltersParams } from './reports-search-filters';

@Injectable()
export class FetchReportsService extends PartialFetcher<Report, SearchFiltersParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        private reportsService: ReportsApiService,
        @Inject(SEARCH_LIMIT)
        protected searchLimit: number
    ) {
        super();
    }

    protected fetch({ realm, ...p }: SearchFiltersParams, continuationToken: string): Observable<InlineResponse20013> {
        return this.reportsService.searchReports({
            ...p,
            reportTypes: isEmpty(p.reportTypes) ? Object.values(Report.ReportTypeEnum) : p.reportTypes,
            continuationToken,
            paymentInstitutionRealm: realm,
            limit: this.searchLimit,
        });
    }
}
