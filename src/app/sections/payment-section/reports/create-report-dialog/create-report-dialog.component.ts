import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import moment from 'moment';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';

import { ReportsService as ReportsApiService } from '../../../../api';
import { ShopInfo } from '../../../../api-codegen/questionary';

@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html'
})
export class CreateReportDialogComponent {
    form = this.fb.group({
        fromTime: moment()
            .subtract(1, 'month')
            .startOf('day'),
        toTime: moment().endOf('day'),
        shopID: null
    });
    shopsInfo$ = this.data.shopsInfo$;

    constructor(
        private dialogRef: MatDialogRef<CreateReportDialogComponent, 'cancel' | 'create'>,
        private fb: FormBuilder,
        private reportsApiService: ReportsApiService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        @Inject(MAT_DIALOG_DATA) private data: { shopsInfo$: Observable<ShopInfo[]> }
    ) {}

    cancel() {
        this.dialogRef.close('cancel');
    }

    create() {
        this.reportsApiService
            .createReport({
                reportType: 'paymentRegistry',
                fromTime: this.form.value.fromTime.utc().format(),
                toTime: this.form.value.toTime.utc().format(),
                shopID: this.form.value.shopID || undefined
            })
            .subscribe(
                () => {
                    this.dialogRef.close('create');
                },
                () => {
                    this.snackBar.open(this.transloco.translate('commonError'), this.transloco.translate('ok'));
                }
            );
    }
}
