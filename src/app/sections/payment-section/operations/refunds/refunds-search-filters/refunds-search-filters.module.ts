import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoicesFilterModule, RefundStatusFilterModule } from '@dsh/app/shared/components';
import { ShopsFilterModule } from '@dsh/app/shared/components/filters/shops-filter';
import { FiltersModule } from '@dsh/components/filters';
import { FiltersGroupModule } from '@dsh/components/filters-group';
import { DateRangeFilterModule } from '@dsh/components/filters/date-range-filter';

import { RefundsSearchFiltersComponent } from './refunds-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FiltersModule,
        FlexLayoutModule,
        InvoicesFilterModule,
        RefundStatusFilterModule,
        ReactiveFormsModule,
        ShopsFilterModule,
        FiltersGroupModule,
        DateRangeFilterModule,
    ],
    declarations: [RefundsSearchFiltersComponent],
    exports: [RefundsSearchFiltersComponent],
})
export class RefundsSearchFiltersModule {}
