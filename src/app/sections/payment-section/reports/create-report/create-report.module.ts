import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ReportsModule } from '@dsh/api/reports';
import { ButtonModule } from '@dsh/components/buttons';

import { CreateReportDialogComponent } from './create-report-dialog.component';
import { CreateReportFormComponent } from './create-report-form';
import { FormatTimeInputDirective } from './create-report-form/format-time-input.directive';
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
        MatInputModule,
    ],
    declarations: [CreateReportDialogComponent, CreateReportFormComponent, FormatTimeInputDirective],
    providers: [CreateReportService],
    entryComponents: [CreateReportDialogComponent],
})
export class CreateReportModule {}
