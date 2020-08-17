import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { ReportsService as ReportsApiService } from '../../../api';
import { Report } from '../../../api-codegen/anapi';
import { booleanDebounceTime } from '../../../custom-operators';
import { PartialFetcher } from '../../partial-fetcher';
import { mapToTimestamp } from '../operations/operators';
import { SearchFiltersParams } from './reports-search-filters';

@Injectable()
export class FetchReportsService extends PartialFetcher<Report, SearchFiltersParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(private reportsService: ReportsApiService) {
        super();
    }

    protected fetch(params: SearchFiltersParams, continuationToken: string) {
        const reportTypes = ['paymentRegistry', 'provisionOfService'] as Report.ReportTypeEnum[];
        return this.reportsService.searchReports({ ...params, reportTypes, continuationToken });
    }
}
