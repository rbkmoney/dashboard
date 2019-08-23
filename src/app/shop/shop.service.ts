import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import negate from 'lodash.negate';

import { Shop, ShopsService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api/gen-x-request-id';
import { SimpleCacheService } from './simple-cache.service';

const isTestShop = ({ id }: Shop): boolean => id === 'TEST';
const toTestShops = (s: Shop[]): Shop[] => s.filter(isTestShop);
const toBattleShops = (s: Shop[]): Shop[] => s.filter(negate(isTestShop));
const findShop = (s: Shop[], shopID: string): Shop | null => s.find(({ id }) => id === shopID);

@Injectable()
export class ShopService extends SimpleCacheService<Shop[]> {
    testShops$: Observable<Shop[]> = this.getCached().pipe(map(toTestShops));
    battleShops$: Observable<Shop[]> = this.getCached().pipe(map(toBattleShops));

    constructor(private shopsService: ShopsService) {
        super();
    }

    getShopByID(shopID: string): Observable<Shop> {
        const found = this.getCached().pipe(map(s => findShop(s, shopID)));
        if (!found) {
            return this.shopsService.getShopByID(genXRequestID(), shopID);
        }
        return found;
    }

    protected targetRequest(): Observable<Shop[]> {
        return this.shopsService.getShops(genXRequestID()).pipe(delay(3000));
    }
}
