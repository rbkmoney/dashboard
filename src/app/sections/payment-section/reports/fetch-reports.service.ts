import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartialFetcher } from '@rbkmoney/partial-fetcher';
import isEmpty from 'lodash-es/isEmpty';
import { Observable } from 'rxjs';
import { pluck, shareReplay, switchMap, take } from 'rxjs/operators';

import { InlineResponse20013, Report } from '@dsh/api-codegen/anapi';
import { ReportsService as ReportsApiService } from '@dsh/api/reports';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';

import { PaymentInstitutionRealm } from '../../../api';
import { booleanDebounceTime, mapToTimestamp } from '../../../custom-operators';
import { SearchFiltersParams } from './reports-search-filters';

@Injectable()
export class FetchReportsService extends PartialFetcher<Report, SearchFiltersParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        private reportsService: ReportsApiService,
        private route: ActivatedRoute,
        @Inject(SEARCH_LIMIT)
        protected searchLimit: number
    ) {
        super();
    }

    protected fetch(p: SearchFiltersParams, continuationToken: string): Observable<InlineResponse20013> {
        return this.route.params.pipe(
            pluck('realm'),
            take(1),
            switchMap((paymentInstitutionRealm: PaymentInstitutionRealm) =>
                this.reportsService.searchReports({
                    ...p,
                    reportTypes: isEmpty(p.reportTypes) ? Object.values(Report.ReportTypeEnum) : p.reportTypes,
                    continuationToken,
                    paymentInstitutionRealm,
                    limit: this.searchLimit,
                })
            )
        );
    }
}
