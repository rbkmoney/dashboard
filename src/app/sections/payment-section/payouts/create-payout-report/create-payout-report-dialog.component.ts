import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

import { Payout } from '@dsh/api-codegen/anapi';

import { CreatePayoutReportDialogService } from './create-payout-report-dialog.service';

@Component({
    templateUrl: 'create-payout-report-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreatePayoutReportDialogService],
})
export class CreatePayoutReportDialogComponent implements OnInit {
    isLoading$ = this.createPayoutReportDialogService.isLoading$;
    reportCreated$ = this.createPayoutReportDialogService.reportCreated$;

    constructor(
        private dialogRef: MatDialogRef<CreatePayoutReportDialogComponent>,
        private router: Router,
        private createPayoutReportDialogService: CreatePayoutReportDialogService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private data: { payout: Payout }
    ) {}

    ngOnInit() {
        this.createPayoutReportDialogService.errorOccurred$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('errors.createReportError', null, 'payouts'), 'OK')
        );
    }

    create() {
        this.createPayoutReportDialogService.create(this.data.payout);
    }

    toReports() {
        this.router.navigate([...this.router.url.split('/').slice(0, -1), 'reports']);
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }
}
