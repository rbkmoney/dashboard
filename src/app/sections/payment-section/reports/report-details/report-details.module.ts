import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelRefsModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { ReportFilesModule } from '../report-files';
import { ReportPipesModule } from '../report-pipes';
import { ReportActionsComponent } from './report-actions';
import { ReportDetailsComponent } from './report-details.component';
import { ReportMainInfoComponent } from './report-main-info';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        CommonModule,
        MatSnackBarModule,
        MatDividerModule,
        ReportFilesModule,
        IndicatorsModule,
        ApiModelRefsModule,
        ReportPipesModule,
    ],
    declarations: [ReportDetailsComponent, ReportMainInfoComponent, ReportActionsComponent],
    exports: [ReportDetailsComponent],
})
export class ReportDetailsModule {}
