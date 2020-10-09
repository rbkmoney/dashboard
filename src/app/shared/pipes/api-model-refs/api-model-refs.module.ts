import { NgModule } from '@angular/core';

import { IdentityDetailsPipe } from './identity-details.pipe';
import { ShopDetailsPipe } from './shop-details.pipe';
import { WalletDetailsPipe } from './wallet-details.pipe';

@NgModule({
    declarations: [ShopDetailsPipe, WalletDetailsPipe, IdentityDetailsPipe],
    exports: [ShopDetailsPipe, WalletDetailsPipe, IdentityDetailsPipe],
})
export class ApiModelRefsModule {}
