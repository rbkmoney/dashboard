import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { ReportsModule, ReportsService } from '../../api/reports';
import { DetailsComponent } from './details/details.component';
import { StatusDetailsItemComponent } from './details/status-details-item';
import { FilesComponent } from './files/files.component';
import { ReportDetailsComponent } from './report-details.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        MatIconModule,
        ReportRoutingModule,
        ReportsModule,
        LayoutModule,
        ButtonModule,
        IndicatorsModule
    ],
    declarations: [ReportDetailsComponent, DetailsComponent, FilesComponent, StatusDetailsItemComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }, ReportsService]
})
export class ReportDetailsModule {}
