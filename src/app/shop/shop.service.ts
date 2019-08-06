import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Shop, ShopsService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api/gen-x-request-id';


@Injectable()
export class ShopService {
    constructor(private shopsService: ShopsService) {}

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopsService.getShopByID(genXRequestID(), shopID);
    }
}
