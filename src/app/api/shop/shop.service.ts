import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { Shop, ShopsService, Claim } from '../../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../utils';
import { CAPIClaimsService } from '../capi';
import { createTestShopClaimChangeset } from './utils';

@Injectable()
export class ShopService {
    shops$: Observable<Shop[]> = this.initShops().pipe(shareReplay(1));

    constructor(private shopsService: ShopsService, private capiClaimsService: CAPIClaimsService) {}

    getShops(): Observable<Shop[]> {
        return this.shopsService.getShops(genXRequestID());
    }

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopsService.getShopByID(genXRequestID(), shopID);
    }

    private createTestShop(): Observable<Claim> {
        return this.capiClaimsService.createClaim(createTestShopClaimChangeset());
    }

    private initShops(): Observable<Shop[]> {
        return this.getShops().pipe(
            switchMap(shops =>
                shops.length === 0 ? this.createTestShop().pipe(switchMap(() => this.getShops())) : of(shops)
            )
        );
    }
}
