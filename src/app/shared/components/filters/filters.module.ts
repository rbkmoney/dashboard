import { NgModule } from '@angular/core';

import { CurrencyFilterModule } from './currency-filter';
import { FilterShopsModule } from './filter-shops';
import { InvoicesFilterModule } from './invoices-filter';
import { QueryFilterModule } from './query-filter';

const EXPORTED_MODULES = [FilterShopsModule, CurrencyFilterModule, InvoicesFilterModule, QueryFilterModule];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class FiltersModule {}
