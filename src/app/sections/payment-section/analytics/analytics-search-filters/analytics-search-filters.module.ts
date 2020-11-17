import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { FilterShopsModule } from '@dsh/app/shared/components';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';

import { CurrencyFilterModule } from '../../../../shared/components/filters/currency-filter';
import { AnalyticsSearchFiltersComponent } from './analytics-search-filters.component';

// import { FilterShopsModule } from '@dsh/app/shared/*';

@NgModule({
    imports: [CommonModule, DaterangeFilterModule, FilterShopsModule, FlexModule, CurrencyFilterModule],
    exports: [AnalyticsSearchFiltersComponent],
    declarations: [AnalyticsSearchFiltersComponent],
})
export class AnalyticsSearchFiltersModule {}
