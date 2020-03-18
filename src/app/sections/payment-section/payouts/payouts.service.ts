import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

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
