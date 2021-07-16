import { NgModule } from '@angular/core';

import { CurrencyFilterModule } from './currency-filter';
import { InvoicesFilterModule } from './invoices-filter';
import { QueryFilterModule } from './query-filter';

const EXPORTED_MODULES = [CurrencyFilterModule, InvoicesFilterModule, QueryFilterModule];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class FiltersModule {}
