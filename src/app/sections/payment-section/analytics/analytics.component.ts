import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { pluck, shareReplay, take } from 'rxjs/operators';

import { SpinnerType } from '@dsh/components/indicators';

import { AnalyticsSearchFiltersStore } from './analytics-search-filters-store.service';
import { SearchParams } from './search-params';
import { ActivatedRoute } from '@angular/router';
import { Shop } from '../../../api-codegen/capi/swagger-codegen';
import { filterShopsByEnv } from '../operations/operators';
import { SHARE_REPLAY_CONF } from '../../../custom-operators';

@Component({
    templateUrl: 'analytics.component.html',
    providers: [AnalyticsSearchFiltersStore],
})
export class AnalyticsComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    searchParams$ = new ReplaySubject<SearchParams>();

    initSearchParams$ = this.analyticsSearchFiltersStore.data$.pipe(take(1));

    envID$: Observable<Shop[]> = this.route.params.pipe(
        pluck('envID'),
        shareReplay(1)
    );

    constructor(private analyticsSearchFiltersStore: AnalyticsSearchFiltersStore, private route: ActivatedRoute) {}

    updateSearchParams(searchParams) {
        this.searchParams$.next(searchParams);
        this.analyticsSearchFiltersStore.preserve(searchParams);
    }
}
