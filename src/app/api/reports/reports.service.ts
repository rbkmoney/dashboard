import { Injectable } from '@angular/core';

import { ReportsService as ReportsApiService } from '../../api-codegen/anapi';
import { genXRequestID, toDateLike } from '../utils';
import { CreateReportReq } from './create-reports';
import { SearchReportsReq } from './search-reports';

@Injectable()
export class ReportsService {
    constructor(private reportsService: ReportsApiService) {}

    createReport({ fromTime, toTime, shopID }: CreateReportReq) {
        return this.reportsService.createReport(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            shopID
        );
    }

    getReport(reportID: number) {
        return this.reportsService.getReport(genXRequestID(), reportID);
    }

    searchReports({ fromTime, toTime, reportTypes, shopID, continuationToken }: SearchReportsReq) {
        return this.reportsService.searchReports(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            reportTypes,
            undefined,
            shopID,
            continuationToken
        );
    }

    downloadFile(reportID: number, fileID: string) {
        return this.reportsService.downloadFile(genXRequestID(), reportID, fileID);
    }
}
