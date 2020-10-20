import { NgModule } from '@angular/core';

import { FilterShopsModule } from './filter-shops';
import { CurrencyFilterModule } from './currency-filter';

const EXPORTED_MODULES = [FilterShopsModule, CurrencyFilterModule];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class FiltersModule {}
