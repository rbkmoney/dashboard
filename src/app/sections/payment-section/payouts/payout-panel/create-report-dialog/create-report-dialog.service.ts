import { Router } from '@angular/router';
import { Subject, Observable, merge } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ReportsService } from '../../../../../api';
import { CreateReportDialogData } from './create-report-dialog-data';
import { progress, SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { Report } from '../../../../../api-codegen/anapi';

@Injectable()
export class CreateReportDialogService {
    private create$ = new Subject<CreateReportDialogData>();

    report$: Observable<Report>;
    isLoading$: Observable<boolean>;

    constructor(private router: Router, private reportsService: ReportsService) {
        const report$ = this.create$
            .pipe(switchMap(data => this.reportsService.createReport(data)))
            .pipe(shareReplay(SHARE_REPLAY_CONF));
        this.isLoading$ = progress(this.create$, report$).pipe(shareReplay(SHARE_REPLAY_CONF));
        merge(report$, this.isLoading$).subscribe();
    }

    create(data: CreateReportDialogData) {
        this.create$.next(data);
    }

    toReports() {
        return this.router.navigate([...this.router.url.split('/').slice(0, -1), 'reports']);
    }
}
