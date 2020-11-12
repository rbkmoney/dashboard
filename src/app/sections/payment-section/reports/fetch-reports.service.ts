import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import isEmpty from 'lodash.isempty';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

import { ReportsService as ReportsApiService } from '../../../api';
import { Report } from '../../../api-codegen/anapi';
import { booleanDebounceTime } from '../../../custom-operators';
import { PartialFetcher } from '../../partial-fetcher';
import { mapToTimestamp } from '../operations/operators';
import { SearchFiltersParams } from './reports-search-filters';

const toMs = (date: Date | string): number => moment(date).valueOf();
const byCreatedAt = (x: Report, y: Report): number => toMs(y.createdAt) - toMs(x.createdAt);
const sortReports = ({ result }) => ({
    result: result.sort(byCreatedAt),
});

@Injectable()
export class FetchReportsService extends PartialFetcher<Report, SearchFiltersParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(private reportsService: ReportsApiService, private route: ActivatedRoute) {
        super();
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
            ),
            map(sortReports)
        );
    }
}
