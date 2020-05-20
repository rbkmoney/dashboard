import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { first, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { ReportsService as ReportsApiService, ShopService } from '../../../api';
import { Report } from '../../../api-codegen/anapi';
import { booleanDebounceTime, SHARE_REPLAY_CONF } from '../../../custom-operators';
import { PartialFetcher } from '../../partial-fetcher';
import { getShopSearchParamsByEnv } from '../operations/get-shop-search-params-by-env';
import { filterShopsByEnv, mapToShopInfo } from '../operations/operators';
import { SearchParams } from './search-params';

@Injectable()
export class ReportsService extends PartialFetcher<Report, SearchParams> {
    shopsInfo$ = this.route.params.pipe(pluck('envID'), filterShopsByEnv(this.shopService.shops$), mapToShopInfo);

    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));

    selectedId$ = this.route.fragment.pipe(
        first(),
        switchMap((fragment) => (fragment ? this.loadSelected(Number(fragment)) : of(-1))),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private reportsService: ReportsApiService,
        private route: ActivatedRoute,
        private router: Router,
        private shopService: ShopService
    ) {
        super();
        this.selectedId$.subscribe();
    }

    select(id: number) {
        this.searchResult$.pipe(pluck(id, 'id')).subscribe((fragment) => {
            this.router.navigate([], { fragment: fragment?.toString(), queryParams: this.route.snapshot.queryParams });
        });
    }

    loadSelected(id: number) {
        return this.fetchResultChanges$.pipe(
            map(({ result }) => result.findIndex((p) => p.id === id)),
            first(null, -1)
        );
    }

    protected fetch(params: SearchParams, continuationToken: string) {
        return this.route.params.pipe(
            pluck('envID'),
            getShopSearchParamsByEnv(this.shopService.shops$),
            switchMap(({ shopIDs }) => this.reportsService.searchReports({ ...params, shopIDs, continuationToken }))
        );
    }
}
