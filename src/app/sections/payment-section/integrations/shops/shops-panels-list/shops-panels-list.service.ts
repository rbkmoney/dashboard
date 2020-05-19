import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, concat, ReplaySubject, Subject } from 'rxjs';
import { first, map, mapTo, pluck, scan, shareReplay } from 'rxjs/operators';

import { Shop } from '../../../../../api-codegen/capi';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';

const SHOPS_LIMIT = 10;

@Injectable()
export class ShopsPanelsListService {
    private allShops$ = new ReplaySubject<Shop[]>(1);
    private showMore$ = new Subject<void>();

    selectedPanelPosition$ = combineLatest([this.route.fragment, this.allShops$]).pipe(
        first(),
        map(([fragment, shops]) => shops.findIndex(({ id }) => id === fragment)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private offset$ = concat(
        this.selectedPanelPosition$.pipe(map((idx) => this.getOffsetBySelectedPanelPosition(idx))),
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

    updateShops(shops: Shop[]) {
        this.allShops$.next(shops);
    }

    private getOffsetBySelectedPanelPosition(idx: number) {
        if (idx === -1) {
            return SHOPS_LIMIT;
        }
        return Math.ceil((idx + 1) / SHOPS_LIMIT) * SHOPS_LIMIT;
    }
}
