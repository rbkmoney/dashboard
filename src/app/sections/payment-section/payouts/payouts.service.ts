import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { filter, first, map, mapTo, pluck, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';

import { PayoutSearchService, ShopService } from '../../../api';
import { Payout } from '../../../api-codegen/anapi';
import { SHARE_REPLAY_CONF } from '../../../custom-operators';
import { PartialFetcher } from '../../partial-fetcher';
import { filterShopsByEnv, mapToShopInfo } from '../operations/operators';
import { SearchParams } from './search-params';

@Injectable()
export class PayoutsService extends PartialFetcher<Payout, SearchParams> {
    shopsInfo$ = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo,
        shareReplay(SHARE_REPLAY_CONF)
    );
    selectedIdx$ = this.route.fragment.pipe(
        first(),
        switchMap(fragment => (fragment ? this.loadSelected(fragment) : of(-1))),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isInit$ = this.selectedIdx$.pipe(mapTo(false), startWith(true), shareReplay(SHARE_REPLAY_CONF));

    constructor(
        private payoutSearchService: PayoutSearchService,
        private route: ActivatedRoute,
        private router: Router,
        private shopService: ShopService
    ) {
        super();
        this.selectedIdx$.subscribe();
    }

    loadSelected(id: string) {
        return this.fetchResultChanges$.pipe(
            map(({ hasMore, result: payouts }) => {
                const idx = payouts.findIndex(p => p.id === id);
                return { idx, isContinueToFetch: idx === -1 && hasMore };
            }),
            tap(({ isContinueToFetch }) => {
                if (isContinueToFetch) {
                    this.fetchMore();
                }
            }),
            take(10),
            filter(({ isContinueToFetch }) => !isContinueToFetch),
            pluck('idx'),
            first(null, -1)
        );
    }

    select(idx: number) {
        this.searchResult$.pipe(pluck(idx, 'id')).subscribe(fragment => {
            this.router.navigate([], { fragment, queryParams: this.route.snapshot.queryParams });
        });
    }

    protected fetch({ fromTime, toTime, ...restParams }: SearchParams, continuationToken: string) {
        return this.payoutSearchService.searchPayouts(fromTime, toTime, 10, { ...restParams, continuationToken });
    }
}
