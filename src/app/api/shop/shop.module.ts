import { NgModule } from '@angular/core';

import { CAPIModule } from '../capi';
import { ShopService } from './shop.service';

@NgModule({
    imports: [CAPIModule],
    providers: [ShopService]
})
export class ShopModule {}
