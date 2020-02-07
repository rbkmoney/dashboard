import { NgModule } from '@angular/core';

import { ShopService } from './shop.service';
import { CAPIModule } from '../capi';

@NgModule({
    imports: [CAPIModule],
    providers: [ShopService]
})
export class ShopModule {}
