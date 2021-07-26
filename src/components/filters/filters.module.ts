import { NgModule } from '@angular/core';

import { DaterangeFilterModule } from './daterange-filter';
import { FilterModule } from './filter';

@NgModule({
    exports: [FilterModule, DaterangeFilterModule],
})
/**
 * @deprecated use components/FilterModule
 */
export class FiltersModule {}
