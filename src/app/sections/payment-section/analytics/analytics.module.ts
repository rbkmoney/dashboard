import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { BarChartModule } from '@dsh/components/charts/bar-chart';
import { DonutChartModule } from '@dsh/components/charts/donut-chart';
import { RangeDatepickerModule } from '@dsh/components/form-controls';
import { JustifyWrapperModule, LayoutModule } from '@dsh/components/layout';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { MiniCardModule } from './mini-card';
import { PercentDifferenceComponent } from './percent-difference';
import { SearchFormComponent } from './search-form';

@NgModule({
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        TranslocoModule,
        RangeDatepickerModule,
        JustifyWrapperModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        BarChartModule,
        DonutChartModule,
        MiniCardModule
    ],
    declarations: [AnalyticsComponent, SearchFormComponent, PercentDifferenceComponent]
})
export class AnalyticsModule {}
