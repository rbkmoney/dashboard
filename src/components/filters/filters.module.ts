import { NgModule } from '@angular/core';

import { DaterangeFilterModule } from './daterange-filter';
import { FilterModule } from './filter';
import { MultiValueFilterModule } from './multi-value-filter';
import { MultiselectFilterModule } from './multiselect-filter';
import { ValueFilterModule } from './value-filter';

@NgModule({
    exports: [FilterModule, DaterangeFilterModule, MultiselectFilterModule, ValueFilterModule, MultiValueFilterModule],
    declarations: [],
})
/**
 * @deprecated use components/FilterModule
 */
export class FiltersModule {}
