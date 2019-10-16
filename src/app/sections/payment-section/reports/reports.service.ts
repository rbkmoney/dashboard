import { Injectable } from '@angular/core';
import { timer, ReplaySubject } from 'rxjs';
import { map, switchMap, shareReplay, debounce, pluck } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { ReportsService as ReportsApiService, ShopService } from '../../../api';
import { SearchParams } from './search-params';
import { filterShopsByEnv, mapToShopInfo } from '../operations/operators';

@Injectable()
export class ReportsService {
    private params$ = new ReplaySubject<SearchParams>();
    private reportsWithToken$ = this.params$.pipe(
        debounce(() => timer(1000)),
        switchMap(params => this.reportsService.searchReports(params)),
        shareReplay(1)
    );
    reports$ = this.reportsWithToken$.pipe(map(({ result }) => result));
    continuationToken$ = this.reportsWithToken$.pipe(map(({ continuationToken }) => continuationToken));
    shopsInfo$ = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo
    );

    constructor(
        private reportsService: ReportsApiService,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {}

    search(params: SearchParams) {
        this.params$.next(params);
    }
}
