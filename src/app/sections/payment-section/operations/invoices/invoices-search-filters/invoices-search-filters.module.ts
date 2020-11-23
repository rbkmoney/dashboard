import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import {
    FilterShopsModule,
    InvoicesFilterModule,
    InvoiceStatusFilterModule,
    RefundStatusFilterModule,
} from '@dsh/app/shared/components';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';

import { InvoicesSearchFiltersComponent } from './invoices-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexLayoutModule,
        InvoicesFilterModule,
        FilterShopsModule,
        RefundStatusFilterModule,
        InvoiceStatusFilterModule,
        DaterangeFilterModule,
    ],
    declarations: [InvoicesSearchFiltersComponent],
    exports: [InvoicesSearchFiltersComponent],
})
export class InvoicesSearchFiltersModule {}
