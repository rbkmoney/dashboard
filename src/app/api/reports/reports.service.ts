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

interface GetReportsReq {
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

    getReports({ fromTime, toTime, reportTypes, partyID, shopID }: GetReportsReq) {
        return this.reportsService.searchReports(
            genXRequestID(),
            fromTime as any,
            toTime as any,
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
