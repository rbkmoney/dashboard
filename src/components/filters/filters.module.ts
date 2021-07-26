import { NgModule } from '@angular/core';

import { DaterangeFilterModule } from './daterange-filter';
import { FilterModule } from './filter';
import { ValueFilterModule } from './value-filter';

@NgModule({
    exports: [FilterModule, DaterangeFilterModule, ValueFilterModule],
})
/**
 * @deprecated use components/FilterModule
 */
export class FiltersModule {}
