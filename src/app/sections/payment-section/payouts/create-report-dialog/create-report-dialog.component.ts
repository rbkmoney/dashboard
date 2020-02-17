import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

type Result = 'canceled' | 'created';

@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReportDialogComponent {
    constructor(private dialogRef: MatDialogRef<CreateReportDialogComponent, Result>) {}

    cancel() {
        this.dialogRef.close('canceled');
    }

    create() {}
}
