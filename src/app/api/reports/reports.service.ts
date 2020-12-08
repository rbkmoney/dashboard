import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Report, ReportLink, ReportsService as ReportsApiService } from '@dsh/api-codegen/anapi';

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
            undefined,
            shopID
        );
    }

    getReport(reportID: number): Observable<Report> {
        return this.reportsService.getReport(genXRequestID(), reportID);
    }

    searchReports({ fromTime, toTime, reportTypes, continuationToken, paymentInstitutionRealm }: SearchReportsReq) {
        return this.reportsService.searchReports(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            reportTypes,
            undefined,
            undefined,
            undefined,
            undefined,
            paymentInstitutionRealm,
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
