import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { FormControlsModule } from '@dsh/components/form-controls';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';
import { TableModule } from '@dsh/components/table';

import { ReportsModule as ReportsApiModule } from '../../../api';
import { ShopSelectorModule } from '../../shop-selector';
import { LastUpdatedModule } from '../operations/last-updated/last-updated.module';
import { CreateReportDialogComponent } from './create-report-dialog';
import { FilesComponent } from './files';
import { ReportListComponent } from './report-list';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SearchFormComponent } from './search-form';

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
        IndicatorsModule,
        MatInputModule,
        LastUpdatedModule,
        MatDialogModule,
        MatSnackBarModule,
        MatMenuModule,
        FormControlsModule,
        EmptySearchResultModule,
        MatDividerModule,
        ShopSelectorModule,
    ],
    declarations: [
        ReportsComponent,
        SearchFormComponent,
        CreateReportDialogComponent,
        ReportListComponent,
        FilesComponent,
    ],
    exports: [ReportsComponent],
    entryComponents: [CreateReportDialogComponent],
})
export class ReportsModule {}
