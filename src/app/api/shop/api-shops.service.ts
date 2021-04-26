import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, startWith, switchMapTo } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { ShopsService } from '@dsh/api-codegen/capi/shops.service';

import { SHARE_REPLAY_CONF } from '../../custom-operators';
import { genXRequestID } from '../utils';

@Injectable()
export class ApiShopsService {
    private reloadShops$ = new Subject<void>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    shops$: Observable<Shop[]> = this.reloadShops$.pipe(
        startWith<void, null>(null),
        switchMapTo(this.shopsService.getShops(genXRequestID())),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private shopsService: ShopsService) {}

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopsService.getShopByID(genXRequestID(), shopID);
    }

    getShops(): Observable<Shop[]> {
        return this.shopsService.getShops(genXRequestID());
    }

    reloadShops() {
        this.reloadShops$.next();
    }

    suspendShop(shopID: string) {
        return this.shopsService.suspendShop(genXRequestID(), shopID);
    }

    activateShop(shopID: string) {
        return this.shopsService.activateShop(genXRequestID(), shopID);
    }
}
