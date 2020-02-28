import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { LayoutModule } from '../../../layout';
import { ButtonModule } from '../../../button';
import { SearchFormComponent } from './search-form';
import { TableComponent } from './table';
import { TableModule } from '../../../table';
import { StateNavModule } from '../../../state-nav';
import { ReportsModule as ReportsApiModule } from '../../../api';
import { StatusModule } from '../../../status';
import { DaterangeSelectorModule } from '../operations/daterange-selector';
import { LastUpdatedModule } from '../operations/last-updated/last-updated.module';
import { SpinnerModule } from '../../../spinner';
import { ActionsComponent } from './table/actions';
import { CreateReportDialogComponent } from './create-report-dialog';
import { FormControlsModule } from '../../../form-controls';

@NgModule({
    imports: [
        TranslocoModule,
        ReportsRoutingModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
        ReactiveFormsModule,
        TableModule,
        StateNavModule,
        MatIconModule,
        TableModule,
        ReportsApiModule,
        CommonModule,
        StatusModule,
        DaterangeSelectorModule,
        MatInputModule,
        LastUpdatedModule,
        SpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatMenuModule,
        FormControlsModule
    ],
    declarations: [
        ReportsComponent,
        SearchFormComponent,
        TableComponent,
        ActionsComponent,
        CreateReportDialogComponent
    ],
    exports: [ReportsComponent],
    entryComponents: [CreateReportDialogComponent]
})
export class ReportsModule {}
