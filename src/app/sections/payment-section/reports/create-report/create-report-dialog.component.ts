import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import moment from 'moment';
import { of } from 'rxjs';

import { ApiShopsService } from '@dsh/api/shop';

import { filterShopsByRealm, mapToShopInfo } from '../../operations/operators';
import { CreateReportDialogService } from './create-report-dialog.service';

const TIME_PATTERN = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

@Component({
    templateUrl: 'create-report-dialog.component.html',
    styleUrls: ['create-report-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateReportDialogService],
})
export class CreateReportDialogComponent implements OnInit {
    isLoading$ = this.createReportDialogService.isLoading$;
    shopsInfo$ = of(this.data.realm).pipe(filterShopsByRealm(this.shopService.shops$), mapToShopInfo);
    form = this.fb.group({
        fromDate: [moment().startOf('month').format(), Validators.required],
        fromTime: ['00:00:00', Validators.pattern(TIME_PATTERN)],
        toDate: [moment().endOf('month').add(1).format(), Validators.required],
        toTime: ['00:00:00', Validators.pattern(TIME_PATTERN)],
        shopID: null,
    });

    constructor(
        private dialogRef: MatDialogRef<CreateReportDialogComponent, 'cancel' | 'created'>,
        private shopService: ApiShopsService,
        private fb: FormBuilder,
        private createReportDialogService: CreateReportDialogService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private data: { realm: string }
    ) {}

    ngOnInit() {
        this.createReportDialogService.reportCreated$.subscribe(() => this.dialogRef.close('created'));
        this.createReportDialogService.errorOccurred$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('errors.createError', null, 'reports'), 'OK')
        );
    }

    create(formValue: any) {
        this.createReportDialogService.create(formValue);
    }

    cancel() {
        this.dialogRef.close('cancel');
    }
}
