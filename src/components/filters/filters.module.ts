import { NgModule } from '@angular/core';

import { DaterangeFilterModule } from './daterange-filter';
import { FilterModule } from './filter';
import { MultiselectFilterModule } from './multiselect-filter';
import { OtherFiltersModule } from './other-filters';

@NgModule({
    exports: [FilterModule, DaterangeFilterModule, MultiselectFilterModule, OtherFiltersModule],
})
export class FiltersModule {}
