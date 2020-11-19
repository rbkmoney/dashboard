import { NgModule } from '@angular/core';

import { CAPIModule } from '../capi';
import { ApiShopsService } from './api-shops.service';

@NgModule({
    imports: [CAPIModule],
    providers: [ApiShopsService],
})
export class ShopModule {}
