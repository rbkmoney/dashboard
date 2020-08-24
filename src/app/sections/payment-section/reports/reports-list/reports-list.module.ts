import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { CancelReportModule } from '../cancel-report';
import { ReportDetailsModule } from '../report-details';
import { ReportPipesModule } from '../report-pipes';
import { ReportRowComponent } from './report-row';
import { ReportRowHeaderComponent } from './report-row-header';
import { ReportsListComponent } from './reports-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        ReportPipesModule,
        ReportDetailsModule,
        CancelReportModule,
    ],
    declarations: [ReportsListComponent, ReportRowHeaderComponent, ReportRowComponent],
    exports: [ReportsListComponent],
})
export class ReportsListModule {}
