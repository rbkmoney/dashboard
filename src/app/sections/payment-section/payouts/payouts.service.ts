import { Injectable } from '@angular/core';
import {
    pluck,
    shareReplay,
    first,
    filter,
    tap,
    map,
    take,
    startWith,
    mapTo,
    defaultIfEmpty,
    catchError
} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, merge, of } from 'rxjs';

import { PartialFetcher } from '../../partial-fetcher';
import { Payout } from '../../../api-codegen/anapi';
import { SearchParams } from './search-params';
import { filterShopsByEnv, mapToShopInfo } from '../operations/operators';
import { PayoutSearchService, ShopService } from '../../../api';
import { SHARE_REPLAY_CONF } from '../../../custom-operators';

@Injectable()
export class PayoutsService extends PartialFetcher<Payout, SearchParams> {
    shopsInfo$ = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo,
        shareReplay(SHARE_REPLAY_CONF)
    );
    selectedIdx$ = merge(
        combineLatest(
            this.searchResult$,
            this.route.fragment.pipe(
                first(),
                filter(f => !!f)
            ),
            this.hasMore$
        ).pipe(
            map(([payouts, fragment, hasMore]) => {
                const idx = payouts.findIndex(({ id }) => id === fragment);
                console.log(idx, hasMore);
                return { idx, isContinueToFetch: idx === -1 && hasMore !== false };
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
        ),
        this.route.fragment.pipe(
            first(),
            filter(f => !f),
            mapTo(-1)
        )
    ).pipe(
        first(null, -1),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isInit$ = this.selectedIdx$.pipe(
        mapTo(false),
        startWith(true),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private payoutSearchService: PayoutSearchService,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {
        super();
    }

    protected fetch({ fromTime, toTime, ...restParams }: SearchParams, continuationToken: string, limit: number = 10) {
        return this.payoutSearchService.searchPayouts(fromTime, toTime, limit, { ...restParams, continuationToken });
    }
}
