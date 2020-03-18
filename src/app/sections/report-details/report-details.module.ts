import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

import { ReportsModule, ReportsService } from '../../api/reports';
import { ButtonModule } from '../../button';
import { DetailsItemModule } from '../../details-item/details-item.module';
import { ExpandPanelModule } from '../../expand-panel';
import { ExpansionModule } from '../../expansion/expansion.module';
import { LayoutModule } from '../../layout';
import { SpinnerModule } from '../../spinner';
import { StatusModule } from '../../status';
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
        DetailsItemModule,
        StatusModule,
        ExpansionModule,
        ButtonModule,
        ExpandPanelModule,
        SpinnerModule
    ],
    declarations: [ReportDetailsComponent, DetailsComponent, FilesComponent, StatusDetailsItemComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }, ReportsService]
})
export class ReportDetailsModule {}
