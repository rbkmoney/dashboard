import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import moment from 'moment';
import { map } from 'rxjs/operators';

import { ReportsService as ReportsApiService } from '../../../api';
import { Report } from '../../../api-codegen/anapi';

interface SearchParams {
    fromTime: string;
    toTime: string;
    reportTypes: Report.ReportTypeEnum[];
    partyID: string;
    shopID?: string;
}

@Injectable()
export class ReportsService {
    reports$: Observable<Report[]> = of([]);
    continuationToken$: Observable<string> = of();

    constructor(private reportsService: ReportsApiService) {
        this.loadReports();
    }

    loadReports() {
        const reportsWithToken$ = this.reportsService.searchReports({
            fromTime: moment()
                .utc()
                .format(),
            toTime: moment()
                .utc()
                .format(),
            reportTypes: [],
            partyID: '',
            shopID: ''
        });
        this.reports$ = reportsWithToken$.pipe(map(({ result }) => result));
        this.continuationToken$ = reportsWithToken$.pipe(map(({ continuationToken }) => continuationToken));
    }
}
