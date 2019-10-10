import { Injectable } from '@angular/core';

import { ReportsService as ReportsApiService, Report } from '../../api-codegen/anapi';
import { genXRequestID } from '../gen-x-request-id';

interface CreateReportReq {
    fromTime: string;
    toTime: string;
    reportType: Report.ReportTypeEnum;
    partyID: string;
    shopID?: string;
}

interface SearchReportsReq {
    fromTime: string;
    toTime: string;
    reportTypes: Report.ReportTypeEnum[];
    partyID: string;
    shopID?: string;
}

@Injectable()
export class ReportsService {
    constructor(private reportsService: ReportsApiService) {}

    createReport({ fromTime, toTime, reportType, partyID, shopID }: CreateReportReq) {
        return this.reportsService.createReport(
            genXRequestID(),
            fromTime as any,
            toTime as any,
            reportType,
            partyID,
            undefined,
            shopID
        );
    }

    getReport(reportID: number) {
        return this.reportsService.getReport(genXRequestID(), reportID);
    }

    searchReports({ fromTime, toTime, reportTypes, partyID, shopID }: SearchReportsReq) {
        return this.reportsService.searchReports(
            genXRequestID(),
            new Date(fromTime),
            new Date(toTime),
            reportTypes,
            partyID,
            undefined,
            shopID
        );
    }

    downloadFile(reportID: number, filedID: string) {
        return this.reportsService.downloadFile(genXRequestID(), reportID, filedID);
    }
}
