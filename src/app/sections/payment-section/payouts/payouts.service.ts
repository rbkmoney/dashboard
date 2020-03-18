import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, merge, Observable } from 'rxjs';
import { filter, first, map, mapTo, pluck, shareReplay, startWith, take, tap } from 'rxjs/operators';

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
    selectedIdx$: Observable<number>;
    isInit$: Observable<boolean>;

    constructor(
        private payoutSearchService: PayoutSearchService,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {
        super();
        const fragmentIdx$ = this.route.fragment.pipe(
            first(),
            shareReplay(SHARE_REPLAY_CONF)
        );
        const defaultSelectedIdxByFragment$ = fragmentIdx$.pipe(
            filter(f => !f),
            mapTo(-1)
        );
        const selectedIdxByFragment$ = combineLatest(
            fragmentIdx$.pipe(filter(f => !!f)),
            this.fetchResultChanges$
        ).pipe(
            map(([fragment, { hasMore, result: payouts }]) => {
                const idx = payouts.findIndex(({ id }) => id === fragment);
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
        this.selectedIdx$ = merge(defaultSelectedIdxByFragment$, selectedIdxByFragment$).pipe(
            shareReplay(SHARE_REPLAY_CONF)
        );
        this.isInit$ = this.selectedIdx$.pipe(
            mapTo(false),
            startWith(true),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    protected fetch({ fromTime, toTime, ...restParams }: SearchParams, continuationToken: string, limit: number = 10) {
        return this.payoutSearchService.searchPayouts(fromTime, toTime, limit, { ...restParams, continuationToken });
    }
}
