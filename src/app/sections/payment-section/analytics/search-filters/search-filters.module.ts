import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { FilterShopsModule } from '@dsh/app/shared/*';
import { DaterangeFilterModule } from '@dsh/components/filters/daterange-filter';

import { SearchFiltersComponent } from './search-filters.component';

@NgModule({
    imports: [CommonModule, DaterangeFilterModule, FilterShopsModule, FlexModule],
    exports: [SearchFiltersComponent],
    declarations: [SearchFiltersComponent],
})
export class SearchFiltersModule {}
