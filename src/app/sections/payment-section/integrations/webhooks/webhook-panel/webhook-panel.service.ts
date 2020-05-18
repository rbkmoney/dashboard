import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Observable, of, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { ShopService } from '../../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { mapToShopInfo, ShopInfo } from '../../../operations/operators';

@Injectable()
export class WebhookPanelService implements OnDestroy {
    private getShopInfo$ = new Subject<string>();
    private subscription: Subscription = Subscription.EMPTY;

    shopInfo$: Observable<ShopInfo> = this.getShopInfo$.pipe(
        distinctUntilChanged(),
        switchMap((shopID) => combineLatest([of(shopID), this.shopService.shops$.pipe(mapToShopInfo)])),
        map(([shopID, shops]) => shops.find((shop) => shop.shopID === shopID)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private shopService: ShopService) {
        this.subscription = this.shopInfo$.subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getShopInfo(shopID: string) {
        this.getShopInfo$.next(shopID);
    }
}
