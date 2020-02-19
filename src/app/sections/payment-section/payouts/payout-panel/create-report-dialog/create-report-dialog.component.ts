import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { tap, switchMapTo } from 'rxjs/operators';

import { ReportsService } from '../../../../../api';

export interface ReportDialogData {
    fromTime: string;
    toTime: string;
    shopID: string;
}

@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html'
})
export class CreateReportDialogComponent {
    isLoading = false;
    isSuccessfullyCreated = false;
    create$ = new Subject<void>();

    constructor(
        private dialogRef: MatDialogRef<CreateReportDialogComponent>,
        private router: Router,
        private reportsService: ReportsService,
        @Inject(MAT_DIALOG_DATA) data: ReportDialogData
    ) {
        this.create$
            .pipe(
                tap(() => {
                    this.isLoading = true;
                }),
                switchMapTo(this.reportsService.createReport(data)),
                tap(() => {
                    this.isLoading = false;
                    this.isSuccessfullyCreated = true;
                })
            )
            .subscribe();
    }

    cancel() {
        this.dialogRef.close();
    }

    create() {
        this.create$.next();
    }

    toReports() {
        this.router.navigate([...this.router.url.split('/').slice(0, -1), 'reports']);
        this.dialogRef.close();
    }
}
