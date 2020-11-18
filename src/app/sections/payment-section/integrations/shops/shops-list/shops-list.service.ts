import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, merge, ReplaySubject, Subject } from 'rxjs';
import { map, mapTo, pluck, scan, shareReplay, take } from 'rxjs/operators';

import { getOffsetBySelectedPanelPosition } from '../../../../../../utils';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { ShopItem } from '../interfaces';

const SHOPS_LIMIT = 5;

@Injectable()
export class ShopsListService {
    private allShops$ = new ReplaySubject<ShopItem[]>(1);
    private showMore$ = new Subject<void>();

    selectedPanelPosition$ = combineLatest([this.route.fragment.pipe(take(1)), this.allShops$]).pipe(
        map(([fragment, shops]) => shops.findIndex(({ id }) => id === fragment)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private offset$ = merge(
        this.selectedPanelPosition$.pipe(map((idx) => getOffsetBySelectedPanelPosition(idx, SHOPS_LIMIT))),
        this.showMore$.pipe(mapTo(SHOPS_LIMIT))
    ).pipe(
        scan((offset, limit) => offset + limit, 0),
        shareReplay(SHARE_REPLAY_CONF)
    );

    shops$ = combineLatest([this.allShops$, this.offset$]).pipe(
        map(([shops, showedCount]) => shops.slice(0, showedCount)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    hasMore$ = combineLatest([this.allShops$.pipe(pluck('length')), this.offset$]).pipe(
        map(([count, showedCount]) => count > showedCount),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private route: ActivatedRoute, private router: Router) {}

    select(idx: number) {
        this.allShops$.pipe(pluck(idx, 'id')).subscribe((fragment) => {
            this.router.navigate([], { fragment, queryParams: this.route.snapshot.queryParams });
        });
    }

    showMore() {
        this.showMore$.next();
    }

    updateShops(shops: ShopItem[]) {
        this.allShops$.next(shops);
    }
}
