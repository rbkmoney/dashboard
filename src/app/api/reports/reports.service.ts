import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Report, ReportLink, ReportsService as ReportsApiService } from '../../api-codegen/anapi';
import { genXRequestID, toDateLike } from '../utils';
import { CreateReportReq } from './create-reports';
import { SearchReportsReq } from './search-reports';

@Injectable()
export class ReportsService {
    constructor(private reportsService: ReportsApiService) {}

    createReport({ fromTime, toTime, shopID }: CreateReportReq): Observable<Report> {
        return this.reportsService.createReport(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            shopID
        );
    }

    getReport(reportID: number): Observable<Report> {
        return this.reportsService.getReport(genXRequestID(), reportID);
    }

    searchReports({ fromTime, toTime, reportTypes, shopIDs, continuationToken }: SearchReportsReq) {
        console.warn('Skip types, return after backend fix', reportTypes);
        return this.reportsService.searchReports(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            ['paymentRegistry', 'provisionOfService'],
            undefined,
            undefined,
            shopIDs,
            continuationToken
        );
    }

    downloadFile(reportID: number, fileID: string): Observable<ReportLink> {
        return this.reportsService.downloadFile(genXRequestID(), reportID, fileID);
    }

    cancelReport(reportID: number): Observable<void> {
        return this.reportsService.cancelReport(genXRequestID(), reportID);
    }
}
