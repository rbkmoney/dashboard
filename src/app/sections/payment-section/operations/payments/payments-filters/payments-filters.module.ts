import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoicesFilterModule } from '@dsh/app/shared/components';
import { ShopsFilterModule } from '@dsh/app/shared/components/filters/shops-filter';
import { DaterangeManagerModule } from '@dsh/app/shared/services/date-range-manager';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';
import { FilterModule } from '@dsh/components/filters/filter';

import { AdditionalFiltersModule } from './additional-filters';
import { CardBinPanFilterModule } from './card-bin-pan-filter';
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
        InvoicesFilterModule,
        DaterangeManagerModule,
        CardBinPanFilterModule,
        ReactiveFormsModule,
        ShopsFilterModule,
    ],
    declarations: [PaymentsFiltersComponent],
    exports: [PaymentsFiltersComponent],
    providers: [PaymentsFiltersService, PaymentsFiltersStoreService],
})
export class PaymentsFiltersModule {}
