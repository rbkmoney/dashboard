import { Injectable } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api/analytics';
import {
    filterError,
    filterPayload,
    progress,
    replaceError,
    SHARE_REPLAY_CONF,
    takeError
} from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { paymentsErrorsDistributionToChartData, paymentsToolDistributionToChartData } from '../utils';

@Injectable()
export class DistributionsService {
    private searchParams$ = new Subject<SearchParams>();

    private toolDistributionOrError$ = this.searchParams$.pipe(
        // ngOnInit push null value
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getPaymentsToolDistribution(fromTime, toTime, shopIDs).pipe(replaceError)
        )
    );
    toolDistribution$ = this.toolDistributionOrError$.pipe(
        filterPayload,
        pluck('result'),
        map(paymentsToolDistributionToChartData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isToolDistributionLoading$ = progress(this.searchParams$, this.toolDistribution$).pipe(
        shareReplay(SHARE_REPLAY_CONF)
    );
    toolDistributionError$ = this.toolDistributionOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    private errorsDistributionOrError$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getPaymentsErrorDistribution(fromTime, toTime, shopIDs).pipe(replaceError)
        )
    );
    errorsDistribution$ = this.errorsDistributionOrError$.pipe(
        filterPayload,
        pluck('result'),
        map(paymentsErrorsDistributionToChartData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isErrorsDistributionLoading$ = progress(this.searchParams$, this.errorsDistribution$).pipe(
        shareReplay(SHARE_REPLAY_CONF)
    );
    errorsDistributionError$ = this.errorsDistributionOrError$.pipe(takeError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(
            this.toolDistribution$,
            this.isToolDistributionLoading$,
            this.toolDistributionError$,
            this.errorsDistribution$,
            this.isErrorsDistributionLoading$,
            this.errorsDistributionError$
        ).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}
