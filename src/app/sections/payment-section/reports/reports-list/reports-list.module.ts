import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { ReportsModule } from '../../../../api';
import { ReportFilesModule } from '../report-files';
import { ShopDetailsItemModule } from '../shop-details-item';
import { ReportDetailsComponent } from './report-details';
import { ReportRowComponent } from './report-row';
import { ReportRowHeaderComponent } from './report-row-header';
import { ReportStatusColorPipe } from './report-status-color.pipe';
import { ReportStatusNamePipe } from './report-status-name.pipe';
import { ReportTypeNamePipe } from './report-type-name.pipe';
import { ReportsListComponent } from './reports-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        MatIconModule,
        ReportsModule,
        CommonModule,
        MatSnackBarModule,
        MatDividerModule,
        ShopDetailsItemModule,
        ReportFilesModule,
        IndicatorsModule,
    ],
    declarations: [
        ReportsListComponent,
        ReportRowHeaderComponent,
        ReportRowComponent,
        ReportDetailsComponent,
        ReportStatusColorPipe,
        ReportStatusNamePipe,
        ReportTypeNamePipe,
    ],
    exports: [ReportsListComponent],
})
export class ReportsListModule {}
