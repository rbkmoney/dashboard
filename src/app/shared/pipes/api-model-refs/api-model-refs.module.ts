import { NgModule } from '@angular/core';

import { ShopDetailsPipe } from './shop-details.pipe';
import { WalletDetailsPipe } from './wallet-details.pipe';

@NgModule({
    declarations: [ShopDetailsPipe, WalletDetailsPipe],
    exports: [ShopDetailsPipe, WalletDetailsPipe],
})
export class ApiModelRefsModule {}
