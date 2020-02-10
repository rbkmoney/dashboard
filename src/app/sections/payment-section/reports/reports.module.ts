import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
        MatMenuModule
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
