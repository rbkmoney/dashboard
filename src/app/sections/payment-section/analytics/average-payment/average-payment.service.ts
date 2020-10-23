import { Injectable } from '@angular/core';
import { forkJoin, merge, Subject } from 'rxjs';
import { map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { amountResultToStatData, searchParamsToStatSearchParams } from '../utils';

@Injectable()
export class AveragePaymentService {
    private initialSearchParams$ = new Subject<SearchParams>();
    private searchParams$ = this.initialSearchParams$.pipe(
        map(searchParamsToStatSearchParams),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private averagePaymentOrError$ = this.searchParams$.pipe(
        switchMap(({ current, previous }) =>
            forkJoin([
                this.analyticsService.getAveragePayment(current.fromTime, current.toTime, current.shopIDs),
                this.analyticsService.getAveragePayment(previous.fromTime, previous.toTime, previous.shopIDs),
            ]).pipe(replaceError)
        )
    );
    averagePayment$ = this.averagePaymentOrError$.pipe(
        filterPayload,
        map((res) => res.map((r) => r.result)),
        map(amountResultToStatData),
        withLatestFrom(this.initialSearchParams$),
        map(([data, searchParams]) => data.find((d) => d.currency === searchParams.currency)),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isLoading$ = progress(this.searchParams$, this.averagePayment$).pipe(shareReplay(SHARE_REPLAY_CONF));
    error$ = this.averagePaymentOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(this.searchParams$, this.averagePayment$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.initialSearchParams$.next(searchParams);
    }
}
