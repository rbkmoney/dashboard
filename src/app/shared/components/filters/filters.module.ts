import { NgModule } from '@angular/core';

import { CurrencyFilterModule } from './currency-filter';
import { FilterShopsModule } from './filter-shops';
import { InvoicesFilterModule } from './invoices-filter';

const EXPORTED_MODULES = [FilterShopsModule, CurrencyFilterModule, InvoicesFilterModule];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class FiltersModule {}
