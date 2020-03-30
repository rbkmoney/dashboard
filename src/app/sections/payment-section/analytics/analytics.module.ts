import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { AnalyticsModule as APIAnalyticsModule } from '../../../api/analytics';
import { BarChartModule } from '../../../charts/bar-chart';
import { DonutChartModule } from '../../../charts/donut-chart';
import { RangeDatepickerModule } from '../../../form-controls/range-datepicker';
import { LayoutModule } from '../../../layout';
import { JustifyWrapperModule } from '../../../layout/justify-wrapper';
import { SpinnerModule } from '../../../spinner';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { DistributionsModule } from './distributions';
import { PercentDifferenceModule } from './percent-difference';
import { SearchFormComponent } from './search-form';
import { StatsModule } from './stats';
import { StatsBarsModule } from './stats-bars';

@NgModule({
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        TranslocoModule,
        JustifyWrapperModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        BarChartModule,
        DonutChartModule,
        APIAnalyticsModule,
        RangeDatepickerModule,
        SpinnerModule,
        StatsModule,
        PercentDifferenceModule,
        StatsBarsModule,
        DistributionsModule
    ],
    declarations: [AnalyticsComponent, SearchFormComponent]
})
export class AnalyticsModule {}
