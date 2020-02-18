import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { AnalyticsComponent } from './analytics.component';
import { LayoutModule } from '../../../layout';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { SearchFormComponent } from './search-form';
import { DaterangeSelectorModule } from '../operations/daterange-selector';
import { JustifyWrapperModule } from '../../../layout/justify-wrapper';
import { BarChartModule } from '../../../charts/bar-chart/bar-chart.module';

@NgModule({
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        TranslocoModule,
        DaterangeSelectorModule,
        JustifyWrapperModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        BarChartModule
    ],
    declarations: [AnalyticsComponent, SearchFormComponent]
})
export class AnalyticsModule {}
