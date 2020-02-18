import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReportDialogComponent {
    isLoading = false;
    isSuccessfullyCreated = false;

    constructor(private dialogRef: MatDialogRef<CreateReportDialogComponent>, private router: Router) {}

    cancel() {
        this.dialogRef.close();
    }

    create() {
        this.isSuccessfullyCreated = true;
    }

    toReports() {
        this.router.navigate([...this.router.url.split('/').slice(0, -1), 'reports']);
        this.dialogRef.close();
    }
}
