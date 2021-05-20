import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';

import { FilterShopsModule } from '@dsh/app/shared/components';
import { CurrencyFilterModule } from '@dsh/app/shared/components/filters/currency-filter';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';

import { AnalyticsSearchFiltersComponent } from './analytics-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        DaterangeFilterModule,
        FilterShopsModule,
        FlexModule,
        CurrencyFilterModule,
        FlexLayoutModule,
    ],
    exports: [AnalyticsSearchFiltersComponent],
    declarations: [AnalyticsSearchFiltersComponent],
})
export class AnalyticsSearchFiltersModule {}
