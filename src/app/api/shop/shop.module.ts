import { NgModule } from '@angular/core';

import { CapiModule } from '../capi';
import { ApiShopsService } from './api-shops.service';

@NgModule({
    imports: [CapiModule],
    providers: [ApiShopsService],
})
export class ShopModule {}
