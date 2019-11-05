import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import moment from 'moment';
import { TranslocoService } from '@ngneat/transloco';

import { ReportsService } from '../../../../api';

@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html'
})
export class CreateReportDialogComponent {
    form = this.fb.group({
        fromTime: moment()
            .subtract(1, 'month')
            .startOf('day'),
        toTime: moment().endOf('day')
    });

    constructor(
        public dialogRef: MatDialogRef<CreateReportDialogComponent, 'cancel' | 'create'>,
        private fb: FormBuilder,
        private reportsService: ReportsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    cancel() {
        this.dialogRef.close('cancel');
    }

    create() {
        this.reportsService
            .createReport({
                reportType: 'paymentRegistry',
                fromTime: this.form.value.fromTime.utc().format(),
                toTime: this.form.value.toTime.utc().format()
            })
            .subscribe(
                () => {
                    this.dialogRef.close('create');
                },
                () => {
                    this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                }
            );
    }
}
