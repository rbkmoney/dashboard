import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ReportsModule } from '@dsh/api/reports';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';
import { BootstrapIconModule } from '@dsh/components/indicators';

import { CreateReportDialogComponent } from './create-report-dialog.component';
import { CreateReportFormComponent } from './create-report-form';
import { FormatTimeInputDirective } from './create-report-form/format-time-input.directive';

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
        MatMomentDateModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        BaseDialogModule,
        BootstrapIconModule,
    ],
    declarations: [CreateReportDialogComponent, CreateReportFormComponent, FormatTimeInputDirective],
})
export class CreateReportModule {}
