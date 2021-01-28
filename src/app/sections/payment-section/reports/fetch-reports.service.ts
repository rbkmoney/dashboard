import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import isEmpty from 'lodash.isempty';
import { pluck, switchMap, take } from 'rxjs/operators';

import { Report } from '@dsh/api-codegen/anapi';
import { ReportsService as ReportsApiService } from '@dsh/api/reports';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

import { DEBOUNCE_FETCHER_ACTION_TIME, IndicatorsPartialFetcher } from '../../partial-fetcher';
import { SearchFiltersParams } from './reports-search-filters';

@Injectable()
export class FetchReportsService extends IndicatorsPartialFetcher<Report, SearchFiltersParams> {
    constructor(
        private reportsService: ReportsApiService,
        private route: ActivatedRoute,
        @Inject(SEARCH_LIMIT)
        protected searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        protected debounceActionTime: number
    ) {
        super(searchLimit, debounceActionTime);
    }

    protected fetch(p: SearchFiltersParams, continuationToken: string) {
        return this.route.params.pipe(
            pluck('realm'),
            take(1),
            switchMap((paymentInstitutionRealm) =>
                this.reportsService.searchReports({
                    ...p,
                    reportTypes: isEmpty(p.reportTypes) ? Object.values(Report.ReportTypeEnum) : p.reportTypes,
                    continuationToken,
                    paymentInstitutionRealm,
                })
            )
        );
    }
}
