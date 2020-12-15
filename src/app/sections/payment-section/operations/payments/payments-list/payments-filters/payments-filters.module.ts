import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterShopsModule, InvoicesFilterModule } from '@dsh/app/shared/components';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';
import { FilterModule } from '@dsh/components/filters/filter';

import { AdditionalFiltersModule } from './additional-filters';
import { DEFAULT_PAYMENTS_FILTERS_DATA, DEFAULT_PAYMENTS_FILTERS_DATA_TOKEN } from './consts';
import { PaymentsFiltersComponent } from './payments-filters.component';
import { PaymentsFiltersStoreService } from './services/payments-filters-store/payments-filters-store.service';
import { PaymentsFiltersService } from './services/payments-filters/payments-filters.service';

@NgModule({
    imports: [
        CommonModule,
        AdditionalFiltersModule,
        TranslocoModule,
        FlexLayoutModule,
        FilterModule,
        DaterangeFilterModule,
        FilterShopsModule,
        InvoicesFilterModule,
    ],
    declarations: [PaymentsFiltersComponent],
    exports: [PaymentsFiltersComponent],
    providers: [
        PaymentsFiltersService,
        PaymentsFiltersStoreService,
        {
            provide: DEFAULT_PAYMENTS_FILTERS_DATA_TOKEN,
            useValue: DEFAULT_PAYMENTS_FILTERS_DATA,
        },
    ],
})
export class PaymentsFiltersModule {}
