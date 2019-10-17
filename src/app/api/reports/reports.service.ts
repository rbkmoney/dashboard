import { Injectable } from '@angular/core';

import { ReportsService as ReportsApiService } from '../../api-codegen/anapi';
import { CreateReportReq } from './create-reports';
import { SearchReportsReq } from './search-reports';
import { toDateLike, genXRequestID } from '../utils';

@Injectable()
export class ReportsService {
    constructor(private reportsService: ReportsApiService) {}

    createReport({ fromTime, toTime, reportType, partyID, shopID }: CreateReportReq) {
        return this.reportsService.createReport(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            reportType,
            partyID,
            undefined,
            shopID
        );
    }

    getReport(reportID: number) {
        return this.reportsService.getReport(genXRequestID(), reportID);
    }

    searchReports({ fromTime, toTime, reportTypes, partyID, shopID, continuationToken }: SearchReportsReq) {
        return this.reportsService.searchReports(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            reportTypes,
            partyID,
            undefined,
            shopID,
            continuationToken
        );
    }

    downloadFile(reportID: number, filedID: string) {
        return this.reportsService.downloadFile(genXRequestID(), reportID, filedID);
    }
}
