import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { InlineResponse20013, Report, ReportLink, ReportsService as ReportsApiService } from '@dsh/api-codegen/anapi';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services';

import { toDateLike } from '../utils';
import { CreateReportReq } from './create-reports';
import { SearchReportsReq } from './search-reports';

@Injectable()
export class ReportsService {
    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    constructor(
        private reportsService: ReportsApiService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private idGenerator: IdGeneratorService
    ) {}

    createReport({ fromTime, toTime, shopID }: CreateReportReq): Observable<Report> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.reportsService.createReport(
                    this.idGenerator.shortUuid(),
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
                    this.idGenerator.shortUuid(),
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
        return this.reportsService.downloadFile(this.idGenerator.shortUuid(), reportID, fileID);
    }

    cancelReport(reportID: number): Observable<void> {
        return this.reportsService.cancelReport(this.idGenerator.shortUuid(), reportID);
    }
}
