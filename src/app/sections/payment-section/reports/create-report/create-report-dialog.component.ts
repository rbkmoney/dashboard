import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import moment from 'moment';
import { of } from 'rxjs';

import { ShopService } from '../../../../api';
import { filterShopsByEnv, mapToShopInfo } from '../../operations/operators';
import { CreateReportDialogService } from './create-report-dialog.service';

@Component({
    templateUrl: 'create-report-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateReportDialogService],
})
export class CreateReportDialogComponent implements OnInit {
    isLoading$ = this.createReportDialogService.isLoading$;
    shopsInfo$ = of(this.data.envID).pipe(filterShopsByEnv(this.shopService.shops$), mapToShopInfo);
    form = this.fb.group({
        fromTime: [moment().startOf('month').format(), Validators.required],
        toTime: [moment().endOf('month').format(), Validators.required],
        shopID: null,
    });

    constructor(
        private dialogRef: MatDialogRef<CreateReportDialogComponent, 'cancel' | 'created'>,
        private shopService: ShopService,
        private fb: FormBuilder,
        private createReportDialogService: CreateReportDialogService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private data: { envID: string }
    ) {}

    ngOnInit() {
        this.createReportDialogService.reportCreated$.subscribe(() => this.dialogRef.close('created'));
        this.createReportDialogService.errorOccurred$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('errors.createError', null, 'reports|scoped'), 'OK')
        );
    }

    create(formValue: any) {
        this.createReportDialogService.create(formValue);
    }

    cancel() {
        this.dialogRef.close('cancel');
    }
}