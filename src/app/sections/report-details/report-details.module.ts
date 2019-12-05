import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { ReportDetailsComponent } from './report-details.component';
import { ReportRoutingModule } from './report-routing.module';
import { DetailsComponent } from './details/details.component';
import { ReportsModule, ReportsService } from '../../api/reports';
import { LayoutModule } from '../../layout';
import { DetailsItemModule } from '../../details-item/details-item.module';
import { StatusDetailsItemComponent } from './details/status-details-item';
import { StatusModule } from '../../status';
import { ExpansionModule } from '../../expansion/expansion.module';
import { FilesComponent } from './files/files.component';
import { ButtonModule } from '../../button';
import { ExpandPanelModule } from '../../expand-panel';
import { SpinnerModule } from '../../spinner';

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
