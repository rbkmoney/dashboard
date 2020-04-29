import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, concat, Subject } from 'rxjs';
import { first, map, mapTo, pluck, scan, shareReplay } from 'rxjs/operators';

import { ShopService } from '../../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { mapToShopInfo } from '../../../operations/operators';
import { getOffsetBySelectedPanelPosition } from '../../get-offset-by-selected-panel-position';
import { ReceiveWebhooksService } from '../receive-webhooks.service';

const WEBHOOKS_LIMIT = 10;

@Injectable()
export class WebhooksPanelsListService {
    private showMore$ = new Subject<void>();

    selectedPanelPosition$ = combineLatest([this.route.fragment, this.receiveWebhooksService.webhooks$]).pipe(
        first(),
        map(([fragment, webhooks]) => webhooks.findIndex(({ id }) => id === fragment)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private offset$ = concat(
        this.selectedPanelPosition$.pipe(map(idx => getOffsetBySelectedPanelPosition(idx, WEBHOOKS_LIMIT))),
        this.showMore$.pipe(mapTo(WEBHOOKS_LIMIT))
    ).pipe(
        scan((offset, limit) => offset + limit, 0),
        shareReplay(SHARE_REPLAY_CONF)
    );

    webhooks$ = combineLatest([this.receiveWebhooksService.webhooks$, this.offset$]).pipe(
        map(([webhooks, showedCount]) => webhooks.slice(0, showedCount)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    hasMore$ = combineLatest([this.receiveWebhooksService.webhooks$.pipe(pluck('length')), this.offset$]).pipe(
        map(([count, showedCount]) => count > showedCount),
        shareReplay(SHARE_REPLAY_CONF)
    );

    shopsInfo$ = this.shopService.shops$.pipe(mapToShopInfo, shareReplay(SHARE_REPLAY_CONF));

    constructor(
        private shopService: ShopService,
        private receiveWebhooksService: ReceiveWebhooksService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    select(idx: number) {
        this.receiveWebhooksService.webhooks$.pipe(pluck(idx, 'id')).subscribe(fragment => {
            this.router.navigate([], { fragment, queryParams: this.route.snapshot.queryParams });
        });
    }

    showMore() {
        this.showMore$.next();
    }
}
