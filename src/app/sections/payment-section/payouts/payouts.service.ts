import { Injectable } from '@angular/core';
import { pluck, shareReplay, first, filter, tap, map, take, catchError, startWith, mapTo } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, of, Observable, merge } from 'rxjs';

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
    selected$ = merge(
        combineLatest(
            this.searchResult$,
            this.route.fragment.pipe(
                first(),
                filter(f => !!f),
                shareReplay(SHARE_REPLAY_CONF)
            ),
            this.hasMore$
        ).pipe(
            map(([r, f, hasMore]) => [r.findIndex(({ id }) => id === f), r, hasMore] as const),
            tap(([idx, hasMore]) => {
                if (idx === -1 && hasMore) {
                    this.fetchMore();
                }
            }),
            take(10),
            pluck(0),
            filter(r => r !== -1),
            first(),
            catchError(() => of(null))
        ),
        this.route.fragment
            .pipe(
                first(),
                filter(f => !f)
            )
            .pipe(mapTo(null))
    ).pipe(shareReplay(SHARE_REPLAY_CONF));
    isInit$: Observable<boolean> = this.selected$.pipe(
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
