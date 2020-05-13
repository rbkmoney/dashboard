import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import moment from 'moment';
import { Observable } from 'rxjs';

import { ReportsService as ReportsApiService } from '../../../../api';
import { ShopInfo } from '../../operations/operators';

@Component({
    selector: 'dsh-create-report-dialog',
    templateUrl: 'create-report-dialog.component.html'
})
export class CreateReportDialogComponent {
    form = this.fb.group({
        date: {
            begin: moment().startOf('month'),
            end: moment().endOf('month')
        },
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
        const { date, shopID } = this.form.value;
        this.reportsApiService
            .createReport({
                fromTime: date.begin.utc().format(),
                toTime: date.end.utc().format(),
                shopID: shopID || undefined
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
