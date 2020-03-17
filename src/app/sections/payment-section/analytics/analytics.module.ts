import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { AnalyticsComponent } from './analytics.component';
import { LayoutModule } from '../../../layout';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { SearchFormComponent } from './search-form';
import { DaterangeSelectorModule } from '../operations/daterange-selector';
import { JustifyWrapperModule } from '../../../layout/justify-wrapper';
import { BarChartModule } from '../../../charts/bar-chart';
import { DonutChartModule } from '../../../charts/donut-chart';
import { PercentDifferenceComponent } from './percent-difference';
import { MiniCardModule } from './mini-card';
import { AnalyticsModule as APIAnalyticsModule } from '../../../api/analytics';
import { RangeDatepickerModule } from '../../../form-controls/range-datepicker';
import { SpinnerModule } from '../../../spinner';

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
        BarChartModule,
        DonutChartModule,
        MiniCardModule,
        APIAnalyticsModule,
        RangeDatepickerModule,
        SpinnerModule
    ],
    declarations: [AnalyticsComponent, SearchFormComponent, PercentDifferenceComponent]
})
export class AnalyticsModule {}
