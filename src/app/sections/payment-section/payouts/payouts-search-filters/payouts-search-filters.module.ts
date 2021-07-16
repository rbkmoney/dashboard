import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { ShopsFilterModule } from '@dsh/app/shared/components/filters/shops-filter';
import { FiltersGroupModule } from '@dsh/components/filters-group';
import { DateRangeFilterModule } from '@dsh/components/filters/date-range-filter';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';

import { PayoutsSearchFiltersComponent } from './payouts-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        DaterangeFilterModule,
        FlexLayoutModule,
        ShopsFilterModule,
        ReactiveFormsModule,
        FiltersGroupModule,
        DateRangeFilterModule,
    ],
    exports: [PayoutsSearchFiltersComponent],
    declarations: [PayoutsSearchFiltersComponent],
})
export class PayoutsSearchFiltersModule {}
