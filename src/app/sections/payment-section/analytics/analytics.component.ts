import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { QueryParamsService } from '@dsh/app/shared/services/query-params';
import { SpinnerType } from '@dsh/components/indicators';

import { PaymentInstitutionRealmService } from '../services';
import { Filters } from './analytics-search-filters/analytics-search-filters.component';
import { filtersToSearchParams } from './utils/filters-to-search-params';

@UntilDestroy()
@Component({
    templateUrl: 'analytics.component.html',
})
export class AnalyticsComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    filters$ = new ReplaySubject<Filters>();

    searchParams$ = combineLatest([this.filters$, this.realmService.realm$]).pipe(
        map(([filters, realm]) => filtersToSearchParams(filters, realm)),
        untilDestroyed(this)
    );

    params$ = this.qp.params$;

    constructor(private realmService: PaymentInstitutionRealmService, private qp: QueryParamsService<Filters>) {}

    updateFilters(filters: Filters): void {
        this.filters$.next(filters);
        void this.qp.set(filters);
    }
}
