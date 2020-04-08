import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subject } from 'rxjs';
import { first, map, shareReplay, switchMap } from 'rxjs/operators';

import { Report } from '../../api-codegen/anapi/swagger-codegen';
import { ReportsService } from '../../api/reports';
import { booleanDebounceTime, SHARE_REPLAY_CONF, takeError } from '../../custom-operators';

@Injectable()
export class ReportDetailsService {
    private initialize$: Subject<number> = new Subject();

    report$: Observable<Report> = this.initialize$.pipe(
        first(),
        switchMap(reportID => this.reportSearchService.getReport(reportID)),
        shareReplay(SHARE_REPLAY_CONF)
    );
    reportInitialized$: Observable<boolean> = this.report$.pipe(
        booleanDebounceTime(),
        map(r => !r),
        shareReplay(SHARE_REPLAY_CONF)
    );
    reportError$: Observable<any> = this.report$.pipe(takeError, shareReplay(SHARE_REPLAY_CONF));

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
