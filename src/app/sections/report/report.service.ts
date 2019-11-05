import { Injectable } from '@angular/core';
import { switchMap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

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

    private catchError() {
        this.snackBar.open(this.transloco.translate('httpError'), 'OK');
        return [];
    }
}
