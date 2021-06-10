import { Injectable } from '@angular/core';
import { defer, Observable, Subject } from 'rxjs';
import { shareReplay, startWith, switchMapTo } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { ShopsService } from '@dsh/api-codegen/capi/shops.service';
import { SHARE_REPLAY_CONF } from '@dsh/operators';

import { genXRequestID } from '../utils';

@Injectable()
export class ApiShopsService {
    shops$: Observable<Shop[]> = defer(() => this.reloadShops$).pipe(
        startWith<void, null>(null),
        switchMapTo(this.shopsService.getShops(genXRequestID())),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private reloadShops$ = new Subject<void>();

    constructor(private shopsService: ShopsService) {}

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopsService.getShopByID(genXRequestID(), shopID);
    }

    getShops(): Observable<Shop[]> {
        return this.shopsService.getShops(genXRequestID());
    }

    reloadShops(): void {
        this.reloadShops$.next();
    }

    suspendShop(shopID: string): Observable<any> {
        return this.shopsService.suspendShop(genXRequestID(), shopID);
    }

    activateShop(shopID: string): Observable<any> {
        return this.shopsService.activateShop(genXRequestID(), shopID);
    }
}
