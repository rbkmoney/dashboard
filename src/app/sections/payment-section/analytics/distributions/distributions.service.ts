import { Injectable } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api/analytics';
import { progress, SHARE_REPLAY_CONF, takeError } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { paymentsErrorsDistributionToChartData, paymentsToolDistributionToChartData } from '../utils';

@Injectable()
export class DistributionsService {
    private searchParams$ = new Subject<SearchParams>();

    paymentsToolDistribution$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getPaymentsToolDistribution(fromTime, toTime, shopIDs)
        ),
        pluck('result'),
        map(paymentsToolDistributionToChartData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isPaymentsToolDistributionLoading$ = progress(this.searchParams$, this.paymentsToolDistribution$).pipe(
        shareReplay(SHARE_REPLAY_CONF)
    );
    paymentsToolDistributionError$ = this.paymentsToolDistribution$.pipe(takeError, shareReplay(SHARE_REPLAY_CONF));

    paymentsErrorsDistribution$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getPaymentsErrorDistribution(fromTime, toTime, shopIDs)
        ),
        pluck('result'),
        map(paymentsErrorsDistributionToChartData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isPaymentsErrorsDistributionLoading$ = progress(this.searchParams$, this.paymentsErrorsDistribution$).pipe(
        shareReplay(SHARE_REPLAY_CONF)
    );
    paymentsErrorsDistributionError$ = this.paymentsErrorsDistribution$.pipe(takeError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(
            this.paymentsToolDistribution$,
            this.isPaymentsToolDistributionLoading$,
            this.paymentsToolDistributionError$,
            this.paymentsErrorsDistribution$,
            this.isPaymentsErrorsDistributionLoading$,
            this.paymentsErrorsDistributionError$
        ).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}
