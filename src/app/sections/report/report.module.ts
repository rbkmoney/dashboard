import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { HeadlineModule } from '../../headline';
import { DetailsComponent } from './details/details.component';
import { ReportsModule } from '../../api/reports';
import { LayoutModule } from '../../layout';
import { DetailsItemModule } from '../../details-item/details-item.module';
import { StatusDetailsItemComponent } from './details/status-details-item';
import { StatusModule } from '../../status';
import { ExpansionModule } from '../../expansion/expansion.module';
import { FilesComponent } from './files/files.component';
import { ButtonModule } from '../../button';
import { ExpandPanelModule } from '../../expand-panel';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        MatIconModule,
        ReportRoutingModule,
        HeadlineModule,
        ReportsModule,
        LayoutModule,
        DetailsItemModule,
        StatusModule,
        ExpansionModule,
        ButtonModule,
        ExpandPanelModule
    ],
    declarations: [ReportComponent, DetailsComponent, FilesComponent, StatusDetailsItemComponent]
})
export class ReportModule {}
