import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterShopsModule, InvoiceStatusFilterModule, RefundStatusFilterModule } from '@dsh/app/shared/components';
import { InvoicesFilterModule } from '@dsh/app/shared/components/filters/invoices-filter2';
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
        ReactiveFormsModule,
    ],
    declarations: [InvoicesSearchFiltersComponent],
    exports: [InvoicesSearchFiltersComponent],
})
export class InvoicesSearchFiltersModule {}
