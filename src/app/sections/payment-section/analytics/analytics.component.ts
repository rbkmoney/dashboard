import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { SpinnerType } from '@dsh/components/indicators';

import { AnalyticsSearchFiltersStore } from './analytics-search-filters-store.service';
import { SearchParams } from './search-params';

@Component({
    templateUrl: 'analytics.component.html',
    providers: [AnalyticsSearchFiltersStore],
})
export class AnalyticsComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    searchParams$ = new ReplaySubject<SearchParams>();

    initSearchParams$ = this.analyticsSearchFiltersStore.data$.pipe(take(1));

    constructor(private analyticsSearchFiltersStore: AnalyticsSearchFiltersStore) {}

    updateSearchParams(searchParams) {
        this.searchParams$.next(searchParams);
        this.analyticsSearchFiltersStore.preserve(searchParams);
    }
}
