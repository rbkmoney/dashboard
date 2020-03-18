import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, startWith, switchMapTo } from 'rxjs/operators';

import { Shop, ShopsService } from '../../api-codegen/capi/swagger-codegen';
import { SHARE_REPLAY_CONF } from '../../custom-operators';
import { genXRequestID } from '../utils';

@Injectable()
export class ShopService {
    private reloadShops$ = new Subject<void>();

    shops$: Observable<Shop[]> = this.reloadShops$.pipe(
        startWith(undefined),
        switchMapTo(this.shopsService.getShops(genXRequestID())),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private shopsService: ShopsService) {}

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopsService.getShopByID(genXRequestID(), shopID);
    }

    reloadShops() {
        this.reloadShops$.next();
    }
}
