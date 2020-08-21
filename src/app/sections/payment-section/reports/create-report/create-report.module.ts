import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { ReportsModule } from '../../../../api';
import { CreateReportDialogComponent } from './create-report-dialog.component';
import { CreateReportFormComponent } from './create-report-form';
import { CreateReportService } from './create-report.service';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        ReportsModule,
        MatSnackBarModule,
        MatDialogModule,
        FlexLayoutModule,
        ButtonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
    declarations: [CreateReportDialogComponent, CreateReportFormComponent],
    providers: [CreateReportService],
    entryComponents: [CreateReportDialogComponent],
})
export class CreateReportModule {}
