import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToMajorModule } from '@dsh/app/shared/pipes';

import { ShopBalanceComponent } from './shop-balance.component';

@NgModule({
    imports: [CommonModule, ToMajorModule],
    declarations: [ShopBalanceComponent],
    exports: [ShopBalanceComponent],
})
export class ShopBalanceModule {}
