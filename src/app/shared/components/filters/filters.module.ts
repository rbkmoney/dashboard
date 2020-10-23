import { NgModule } from '@angular/core';

import { CurrencyFilterModule } from './currency-filter';
import { FilterShopsModule } from './filter-shops';

const EXPORTED_MODULES = [FilterShopsModule, CurrencyFilterModule];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class FiltersModule {}
