import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule
} from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { FormControlsModule } from '@dsh/components/form-controls';
import { TableModule } from '@dsh/components/table';

import { ReportsModule as ReportsApiModule } from '../../../api';
import { ButtonModule } from '../../../button';
import { LayoutModule } from '../../../layout';
import { SpinnerModule } from '../../../spinner';
import { StateNavModule } from '../../../state-nav';
import { StatusModule } from '../../../status';
import { EmptySearchResultModule } from '../empty-search-result';
import { LastUpdatedModule } from '../operations/last-updated/last-updated.module';
import { CreateReportDialogComponent } from './create-report-dialog';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SearchFormComponent } from './search-form';
import { TableComponent } from './table';
import { ActionsComponent } from './table/actions';

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
        MatInputModule,
        LastUpdatedModule,
        SpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatMenuModule,
        FormControlsModule,
        EmptySearchResultModule
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
