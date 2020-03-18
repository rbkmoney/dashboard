import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CreateReportDialogData } from './create-report-dialog-data';
import { CreateReportDialogService } from './create-report-dialog.service';

@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html',
    providers: [CreateReportDialogService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReportDialogComponent {
    isLoading$ = this.createReportDialogService.isLoading$;
    report$ = this.createReportDialogService.report$;

    constructor(
        private dialogRef: MatDialogRef<CreateReportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: CreateReportDialogData,
        private createReportDialogService: CreateReportDialogService
    ) {}

    cancel() {
        this.dialogRef.close();
    }

    create() {
        this.createReportDialogService.create(this.data);
    }

    toReports() {
        this.createReportDialogService.toReports();
        this.dialogRef.close();
    }
}
