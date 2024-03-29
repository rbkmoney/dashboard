import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoicesFilterModule } from '@dsh/app/shared/components';
import { ShopsFilterModule } from '@dsh/app/shared/components/filters/shops-filter';
import { DaterangeManagerModule } from '@dsh/app/shared/services/date-range-manager';
import { FiltersGroupModule } from '@dsh/components/filters-group';
import { DateRangeFilterModule } from '@dsh/components/filters/date-range-filter';
import { FilterModule } from '@dsh/components/filters/filter';

import { AdditionalFiltersModule } from './additional-filters';
import { CardBinPanFilterModule } from './card-bin-pan-filter';
import { PaymentsFiltersComponent } from './payments-filters.component';

@NgModule({
    imports: [
        CommonModule,
        AdditionalFiltersModule,
        TranslocoModule,
        FlexLayoutModule,
        FilterModule,
        InvoicesFilterModule,
        DaterangeManagerModule,
        CardBinPanFilterModule,
        ReactiveFormsModule,
        ShopsFilterModule,
        FiltersGroupModule,
        DateRangeFilterModule,
    ],
    declarations: [PaymentsFiltersComponent],
    exports: [PaymentsFiltersComponent],
})
export class PaymentsFiltersModule {}
