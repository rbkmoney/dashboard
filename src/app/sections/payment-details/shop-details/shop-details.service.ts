import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Shop } from '../../../api-codegen/capi/swagger-codegen';
import { ShopService } from '../../../api/shop';

@Injectable()
export class ShopDetailsService {
    constructor(private shopService: ShopService) {}

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopService.getShopByID(shopID);
    }
}
