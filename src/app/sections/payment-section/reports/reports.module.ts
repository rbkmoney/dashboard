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
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { FormControlsModule } from '@dsh/components/form-controls';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';

import { ReportsModule as ReportsApiModule } from '../../../api';
import { CreateReportDialogComponent } from './create-report-dialog';
import { ReportsListModule } from './reports-list';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SearchFormComponent } from './search-form';
import { ShopDetailsItemModule } from './shop-details-item';

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
        MatIconModule,
        ReportsApiModule,
        CommonModule,
        IndicatorsModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        FormControlsModule,
        EmptySearchResultModule,
        MatDividerModule,
        ReportsListModule,
        ShopDetailsItemModule,
        ScrollUpModule,
    ],
    declarations: [ReportsComponent, SearchFormComponent, CreateReportDialogComponent],
    exports: [ReportsComponent],
    entryComponents: [CreateReportDialogComponent],
})
export class ReportsModule {}
