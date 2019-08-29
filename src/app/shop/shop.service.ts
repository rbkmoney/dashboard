import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import negate from 'lodash.negate';

import { Shop, ShopsService } from '../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../api-codegen/gen-x-request-id';

const isTestShop = ({ id }: Shop): boolean => id === 'TEST';
const toTestShops = (s: Shop[]): Shop[] => s.filter(isTestShop);
const toBattleShops = (s: Shop[]): Shop[] => s.filter(negate(isTestShop));

@Injectable()
export class ShopService {
    testShops$: Observable<Shop[]> = this.getShops().pipe(map(toTestShops));
    battleShops$: Observable<Shop[]> = this.getShops().pipe(map(toBattleShops));

    constructor(private shopsService: ShopsService) {}

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopsService.getShopByID(genXRequestID(), shopID);
    }

    private getShops(): Observable<Shop[]> {
        return this.shopsService.getShops(genXRequestID()).pipe(shareReplay(1));
    }

    protected targetRequest(): Observable<Shop[]> {
        return this.shopsService.getShops(genXRequestID());
    }
}
