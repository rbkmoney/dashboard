import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { FilterShopsModule } from '@dsh/app/shared/*';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';

import { AnalyticsSearchFiltersComponent } from './analytics-search-filters.component';

@NgModule({
    imports: [CommonModule, DaterangeFilterModule, FilterShopsModule, FlexModule],
    exports: [AnalyticsSearchFiltersComponent],
    declarations: [AnalyticsSearchFiltersComponent],
})
export class AnalyticsSearchFiltersModule {}
