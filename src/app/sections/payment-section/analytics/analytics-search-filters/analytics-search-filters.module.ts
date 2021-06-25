import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { CurrencyFilterModule } from '@dsh/app/shared/components/filters/currency-filter';
import { ShopsFilterModule } from '@dsh/app/shared/components/filters/shops-filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';

import { AnalyticsSearchFiltersComponent } from './analytics-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        DaterangeFilterModule,
        FlexModule,
        CurrencyFilterModule,
        FlexLayoutModule,
        ShopsFilterModule,
        ReactiveFormsModule,
        FiltersGroupModule,
    ],
    exports: [AnalyticsSearchFiltersComponent],
    declarations: [AnalyticsSearchFiltersComponent],
})
export class AnalyticsSearchFiltersModule {}
