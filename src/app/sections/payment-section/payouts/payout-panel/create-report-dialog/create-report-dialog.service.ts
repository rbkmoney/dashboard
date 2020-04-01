import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { merge, Observable, Subject } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';

import { ReportsService } from '../../../../../api';
import { Report } from '../../../../../api-codegen/anapi';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { CreateReportDialogData } from './create-report-dialog-data';

@Injectable()
export class CreateReportDialogService {
    private create$ = new Subject<CreateReportDialogData>();

    report$: Observable<Report>;
    isLoading$: Observable<boolean>;
    errors$: Observable<any>;

    constructor(
        private router: Router,
        private reportsService: ReportsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        const report$ = this.create$.pipe(
            switchMap(data => this.reportsService.createReport(data).pipe(replaceError)),
            shareReplay(SHARE_REPLAY_CONF)
        );

        this.report$ = report$.pipe(filterPayload, shareReplay(SHARE_REPLAY_CONF));
        this.errors$ = report$.pipe(
            filterError,
            tap(error => {
                this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                console.error(error);
            }),
            shareReplay(SHARE_REPLAY_CONF)
        );
        this.isLoading$ = progress(this.create$, report$).pipe(shareReplay(SHARE_REPLAY_CONF));

        merge(this.report$, this.isLoading$, this.errors$).subscribe();
    }

    create(data: CreateReportDialogData) {
        this.create$.next(data);
    }

    toReports() {
        return this.router.navigate([...this.router.url.split('/').slice(0, -1), 'reports']);
    }
}
