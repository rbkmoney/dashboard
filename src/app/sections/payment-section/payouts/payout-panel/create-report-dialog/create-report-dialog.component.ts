import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

type Result = 'canceled' | 'created';

@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReportDialogComponent {
    isLoading = false;
    isSuccessfullyCreated = false;

    constructor(
        private dialogRef: MatDialogRef<CreateReportDialogComponent, Result>,
        private router: Router,
        private route: ActivatedRoute
    ) {
        setInterval(() => this.route.url.subscribe(console.log), 1000);
    }

    cancel() {
        this.dialogRef.close('canceled');
    }

    create() {
        this.isSuccessfullyCreated = true;
    }

    toReports() {
        this.router.navigate(['../', 'reports'], { relativeTo: this.route });
    }
}
