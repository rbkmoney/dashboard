import { Injectable } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api/analytics';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { paymentsErrorsDistributionToChartData } from './payments-errors-distribution-to-chart-data';

@Injectable()
export class PaymentsErrorDistributionService {
    private searchParams$ = new Subject<SearchParams>();

    private errorDistributionOrError$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getPaymentsErrorDistribution(fromTime, toTime, shopIDs).pipe(replaceError)
        )
    );
    errorDistribution$ = this.errorDistributionOrError$.pipe(
        filterPayload,
        pluck('result'),
        map(paymentsErrorsDistributionToChartData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isLoading$ = progress(this.searchParams$, this.errorDistribution$).pipe(shareReplay(SHARE_REPLAY_CONF));
    error$ = this.errorDistributionOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(this.errorDistribution$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}
