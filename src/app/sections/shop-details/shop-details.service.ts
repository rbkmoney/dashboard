import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Shop } from '@dsh/api-codegen/capi';
import { ApiShopsService } from '@dsh/api/shop';

@Injectable()
export class ShopDetailsService {
    constructor(private shopService: ApiShopsService) {}

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopService.getShopByID(shopID);
    }
}
