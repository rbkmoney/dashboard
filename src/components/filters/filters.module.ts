import { NgModule } from '@angular/core';

import { DaterangeFilterModule } from './daterange-filter';
import { FilterModule } from './filter';
import { MultiselectFilterModule } from './multiselect-filter';

@NgModule({
    exports: [FilterModule, DaterangeFilterModule, MultiselectFilterModule],
})
export class FiltersModule {}
