import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { PartialFetcher } from '../../partial-fetcher';
import { Payout } from '../../../api-codegen/anapi';
import { SearchParams } from './search-params';
import { filterShopsByEnv, mapToShopInfo } from '../operations/operators';
import { PayoutSearchService, ShopService } from '../../../api';

@Injectable()
export class PayoutsService extends PartialFetcher<Payout, SearchParams> {
    shopsInfo$ = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo
    );

    constructor(
        private payoutSearchService: PayoutSearchService,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {
        super();
    }

    protected fetch({ fromTime, toTime, ...restParams }: SearchParams, continuationToken: string) {
        return this.payoutSearchService.searchPayouts(fromTime, toTime, 1000, { ...restParams, continuationToken });
    }
}
