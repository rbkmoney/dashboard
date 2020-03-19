import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subject } from 'rxjs';
import { first, map, shareReplay, switchMap } from 'rxjs/operators';

import { Report } from '../../api-codegen/anapi/swagger-codegen';
import { ReportsService } from '../../api/reports';
import { booleanDelay, takeError } from '../../custom-operators';

@Injectable()
export class ReportDetailsService {
    private initialize$: Subject<number> = new Subject();

    report$: Observable<Report> = this.initialize$.pipe(
        first(),
        switchMap(reportID => this.reportSearchService.getReport(reportID)),
        shareReplay(1)
    );
    reportInitialized$: Observable<boolean> = this.report$.pipe(
        booleanDelay(500),
        map(r => !r)
    );
    reportError$: Observable<any> = this.report$.pipe(
        takeError,
        shareReplay(1)
    );

    constructor(
        private reportSearchService: ReportsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.reportError$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    initialize(reportID: number) {
        this.initialize$.next(reportID);
    }
}
