import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { FilterShopsModule } from '@dsh/app/shared/*';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';

import { AnalyticsSearchFiltersComponent } from './analytics-search-filters.component';
import { CurrencyFilterModule } from '../../../../shared/components/filters/currency-filter';

@NgModule({
    imports: [CommonModule, DaterangeFilterModule, FilterShopsModule, FlexModule, CurrencyFilterModule],
    exports: [AnalyticsSearchFiltersComponent],
    declarations: [AnalyticsSearchFiltersComponent],
})
export class AnalyticsSearchFiltersModule {}
