import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { InlineResponse20013, Report, ReportLink, ReportsService as ReportsApiService } from '@dsh/api-codegen/anapi';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services';

import { genXRequestID, toDateLike } from '../utils';
import { CreateReportReq } from './create-reports';
import { SearchReportsReq } from './search-reports';

@Injectable()
export class ReportsService {
    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    constructor(
        private reportsService: ReportsApiService,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {}

    createReport({ fromTime, toTime, shopID }: CreateReportReq): Observable<Report> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.reportsService.createReport(
                    genXRequestID(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    shopID
                )
            )
        );
    }

    searchReports({
        fromTime,
        toTime,
        limit,
        reportTypes,
        continuationToken,
        paymentInstitutionRealm,
    }: SearchReportsReq): Observable<InlineResponse20013> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.reportsService.searchReports(
                    genXRequestID(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    reportTypes,
                    undefined,
                    undefined,
                    undefined,
                    paymentInstitutionRealm,
                    limit,
                    continuationToken
                )
            )
        );
    }

    downloadFile(reportID: number, fileID: string): Observable<ReportLink> {
        return this.reportsService.downloadFile(genXRequestID(), reportID, fileID);
    }

    cancelReport(reportID: number): Observable<void> {
        return this.reportsService.cancelReport(genXRequestID(), reportID);
    }
}
