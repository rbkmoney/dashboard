import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterShopsModule, InvoicesFilterModule, RefundStatusFilterModule } from '@dsh/app/shared/components';
import { FiltersModule } from '@dsh/components/filters';

import { RefundsSearchFiltersComponent } from './refunds-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FiltersModule,
        FlexLayoutModule,
        InvoicesFilterModule,
        FilterShopsModule,
        RefundStatusFilterModule,
    ],
    declarations: [RefundsSearchFiltersComponent],
    exports: [RefundsSearchFiltersComponent],
})
export class RefundsSearchFiltersModule {}
