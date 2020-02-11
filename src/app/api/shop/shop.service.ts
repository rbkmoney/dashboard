import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, switchMap, startWith } from 'rxjs/operators';

import { Shop, ShopsService } from '../../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../utils';
import { SHARE_REPLAY_CONF } from '../../custom-operators';

@Injectable()
export class ShopService {
    private reloadShops$ = new Subject<void>();

    shops$: Observable<Shop[]> = this.reloadShops$.pipe(
        startWith(undefined),
        switchMap(() => this.getShops()),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private shopsService: ShopsService) {}

    private getShops(): Observable<Shop[]> {
        return this.shopsService.getShops(genXRequestID());
    }

    getShopByID(shopID: string): Observable<Shop> {
        return this.shopsService.getShopByID(genXRequestID(), shopID);
    }

    reloadShops() {
        this.reloadShops$.next();
    }
}
