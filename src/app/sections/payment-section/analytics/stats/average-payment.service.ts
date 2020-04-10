import { Injectable } from '@angular/core';
import { forkJoin, merge, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { amountResultToStatData, SearchParamsForCurrentAndPreviousPeriod } from '../utils';

@Injectable()
export class AveragePaymentService {
    private searchParams$ = new Subject<SearchParamsForCurrentAndPreviousPeriod>();

    private averagePaymentOrError$ = this.searchParams$.pipe(
        switchMap(({ current, previous }) =>
            forkJoin(
                this.analyticsService.getAveragePayment(current.fromTime, current.toTime, current.shopIDs),
                this.analyticsService.getAveragePayment(previous.fromTime, previous.toTime, previous.shopIDs)
            ).pipe(replaceError)
        )
    );
    averagePayment$ = this.averagePaymentOrError$.pipe(
        filterPayload,
        map(res => res.map(r => r.result)),
        map(amountResultToStatData),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isAveragePaymentLoading$ = progress(this.searchParams$, this.averagePayment$).pipe(shareReplay(SHARE_REPLAY_CONF));
    averagePaymentError$ = this.averagePaymentOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(
            this.searchParams$,
            this.averagePayment$,
            this.isAveragePaymentLoading$,
            this.averagePaymentError$
        ).subscribe();
    }

    searchParamsChanges(searchParams: SearchParamsForCurrentAndPreviousPeriod) {
        this.searchParams$.next(searchParams);
    }
}
