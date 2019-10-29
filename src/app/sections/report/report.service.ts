import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

import { ReportLink } from '../../api-codegen/anapi/swagger-codegen';
import { ReportsService } from '../../api/reports';

@Injectable()
export class ReportService {
    report$ = this.route.params.pipe(
        switchMap(({ reportID }) => this.reportSearchService.getReport(reportID)),
        catchError(() => this.catchError())
    );

    constructor(
        private route: ActivatedRoute,
        private reportSearchService: ReportsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    downloadReport(reportID: number, fileID: string): Observable<ReportLink> {
        return this.reportSearchService.downloadFile(reportID, fileID).pipe(catchError(() => this.catchError()));
    }

    private catchError() {
        this.snackBar.open(this.transloco.translate('httpError'), 'OK');
        return [];
    }
}
