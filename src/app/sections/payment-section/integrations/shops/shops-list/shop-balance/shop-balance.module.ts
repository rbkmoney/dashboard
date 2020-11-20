import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToMajorModule } from '../../../../../../to-major';
import { ShopBalanceComponent } from './shop-balance.component';

@NgModule({
    imports: [CommonModule, ToMajorModule],
    declarations: [ShopBalanceComponent],
    exports: [ShopBalanceComponent],
})
export class ShopBalanceModule {}
