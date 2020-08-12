import { NgModule } from '@angular/core';

import { FilterShopsModule } from './filter-shops';

const EXPORTED_MODULES = [FilterShopsModule];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class FiltersModule {}
