import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { QueryFilterModule } from '@dsh/app/shared/components/filters/query-filter';

import { ShopQueryFilterComponent } from './shop-query-filter.component';

@NgModule({
    imports: [CommonModule, QueryFilterModule, TranslocoModule],
    declarations: [ShopQueryFilterComponent],
    exports: [ShopQueryFilterComponent],
})
export class ShopQueryFilterModule {}
