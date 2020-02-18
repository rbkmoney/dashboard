import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html'
})
export class CreateReportDialogComponent {
    isLoading = false;
    isSuccessfullyCreated = false;

    constructor(private dialogRef: MatDialogRef<CreateReportDialogComponent>, private router: Router) {}

    cancel() {
        this.dialogRef.close();
    }

    create() {
        // TODO
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            this.isSuccessfullyCreated = true;
        }, 1000);
    }

    toReports() {
        this.router.navigate([...this.router.url.split('/').slice(0, -1), 'reports']);
        this.dialogRef.close();
    }
}
