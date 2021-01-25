import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterShopsModule, InvoicesFilterModule } from '@dsh/app/shared/components';
import { DaterangeManagerModule } from '@dsh/app/shared/services/date-range-manager';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';
import { FilterModule } from '@dsh/components/filters/filter';

import { AdditionalFiltersModule } from './additional-filters';
import { CardBinPanFilterModule } from './card-bin-pan-filter';
import { PaymentsFiltersComponent } from './payments-filters.component';
import { PaymentsFiltersStoreService } from './services/payments-filters-store/payments-filters-store.service';
import { PaymentsFiltersService } from './services/payments-filters/payments-filters.service';
import { ShopsSelectionManagerService } from './services/shops-selection-manager/shops-selection-manager.service';

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
        DaterangeManagerModule,
        CardBinPanFilterModule,
    ],
    declarations: [PaymentsFiltersComponent],
    exports: [PaymentsFiltersComponent],
    providers: [PaymentsFiltersService, PaymentsFiltersStoreService, ShopsSelectionManagerService],
})
export class PaymentsFiltersModule {}
