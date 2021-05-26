import { NgModule } from '@angular/core';

import { InvoicesFilterModule } from './_deprecated-invoices-filter';
import { CurrencyFilterModule } from './currency-filter';
import { FilterShopsModule } from './filter-shops';
import { QueryFilterModule } from './query-filter';

const EXPORTED_MODULES = [FilterShopsModule, CurrencyFilterModule, InvoicesFilterModule, QueryFilterModule];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class FiltersModule {}
