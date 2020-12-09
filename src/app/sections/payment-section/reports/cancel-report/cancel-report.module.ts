import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ReportsModule } from '@dsh/api/reports';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { CancelReportService } from './cancel-report.service';

@NgModule({
    imports: [TranslocoModule, ReportsModule, MatSnackBarModule, ConfirmActionDialogModule, MatDialogModule],
    providers: [CancelReportService],
})
export class CancelReportModule {}
