import { Injectable } from '@angular/core';
import { pluck, shareReplay, first, filter, tap, switchMap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
    selected$ = this.route.fragment.pipe(
        first(),
        filter(f => !!f),
        switchMap(f => this.searchResult$.pipe(map(r => r.findIndex(({ id }) => id === f)))),
        tap(r => r === -1 && this.fetchMore()),
        filter(r => r !== -1),
        first(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private payoutSearchService: PayoutSearchService,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {
        super();
    }

    protected fetch({ fromTime, toTime, ...restParams }: SearchParams, continuationToken: string) {
        return this.payoutSearchService.searchPayouts(fromTime, toTime, 10, { ...restParams, continuationToken });
    }
}
