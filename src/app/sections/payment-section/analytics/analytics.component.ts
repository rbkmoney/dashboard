import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { QueryParamsService } from '@dsh/app/shared/services/query-params';
import { SpinnerType } from '@dsh/components/indicators';

import { PaymentInstitutionRealmService } from '../services/payment-institution-realm/payment-institution-realm.service';
import { AnalyticsSearchFiltersStore } from './analytics-search-filters-store.service';
import { Filters } from './analytics-search-filters/analytics-search-filters.component';
import { filtersToSearchParams } from './utils/filters-to-search-params';

@Component({
    templateUrl: 'analytics.component.html',
    providers: [AnalyticsSearchFiltersStore, QueryParamsService],
})
export class AnalyticsComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    filters$ = new ReplaySubject<Filters>();

    searchParams$ = this.filters$.pipe(map(filtersToSearchParams), shareReplay(1));

    params$ = this.qp.params$;

    constructor(
        private analyticsSearchFiltersStore: AnalyticsSearchFiltersStore,
        private realmService: PaymentInstitutionRealmService,
        private qp: QueryParamsService<Filters>
    ) {}

    updateFilters(filters: Filters): void {
        this.filters$.next(filters);
        void this.qp.set(filters);
    }
}
