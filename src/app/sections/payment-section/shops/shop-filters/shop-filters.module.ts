import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShopFiltersComponent } from './shop-filters.component';
import { ShopQueryFilterModule } from './shop-query-filter';

@NgModule({
    imports: [CommonModule, ShopQueryFilterModule, FlexLayoutModule],
    declarations: [ShopFiltersComponent],
    exports: [ShopFiltersComponent],
})
export class ShopFiltersModule {}
