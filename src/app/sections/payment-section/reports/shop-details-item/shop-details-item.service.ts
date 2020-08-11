import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay } from 'rxjs/operators';

import { ShopService } from '../../../../api';

@Injectable()
export class ShopDetailsItemService {
    private shopID$: Subject<string> = new ReplaySubject(1);

    shopName$: Observable<string> = combineLatest([
        this.shopID$.pipe(distinctUntilChanged()),
        this.shopService.shops$,
    ]).pipe(
        map(([shopID, shops]) => shops.find((s) => s.id === shopID)),
        pluck('details', 'name'),
        shareReplay(1)
    );

    constructor(private shopService: ShopService) {}

    setShopID(shopID: string) {
        this.shopID$.next(shopID);
    }
}
