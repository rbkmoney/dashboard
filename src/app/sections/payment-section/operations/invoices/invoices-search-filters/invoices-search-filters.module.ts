import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceStatusFilterModule, RefundStatusFilterModule } from '@dsh/app/shared/components';
import { InvoicesFilterModule } from '@dsh/app/shared/components/filters/invoices-filter';
import { ShopsFilterModule } from '@dsh/app/shared/components/filters/shops-filter';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';

import { InvoicesSearchFiltersComponent } from './invoices-search-filters.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexLayoutModule,
        InvoicesFilterModule,
        RefundStatusFilterModule,
        InvoiceStatusFilterModule,
        DaterangeFilterModule,
        ReactiveFormsModule,
        ShopsFilterModule,
    ],
    declarations: [InvoicesSearchFiltersComponent],
    exports: [InvoicesSearchFiltersComponent],
})
export class InvoicesSearchFiltersModule {}
