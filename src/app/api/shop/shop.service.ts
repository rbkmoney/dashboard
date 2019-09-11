import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Shop, ShopsService } from '../../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../gen-x-request-id';

@Injectable()
export class ShopService {
    shops$: Observable<Shop[]> = this.shopsService.getShops(genXRequestID()).pipe(shareReplay(1));

    constructor(private shopsService: ShopsService) {}

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopsService.getShopByID(genXRequestID(), shopID);
    }
}
