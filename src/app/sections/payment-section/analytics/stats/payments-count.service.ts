import { Injectable } from '@angular/core';
import { forkJoin, merge, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { countResultToStatData, SearchParamsForCurrentAndPreviousPeriod } from '../utils';

@Injectable()
export class PaymentsCountService {
    private searchParams$ = new Subject<SearchParamsForCurrentAndPreviousPeriod>();

    private paymentsCountOrError$ = this.searchParams$.pipe(
        switchMap(({ current, previous }) =>
            forkJoin(
                this.analyticsService.getPaymentsCount(current.fromTime, current.toTime, current.shopIDs),
                this.analyticsService.getPaymentsCount(previous.fromTime, previous.toTime, previous.shopIDs)
            ).pipe(replaceError)
        )
    );
    paymentsCount$ = this.paymentsCountOrError$.pipe(
        filterPayload,
        map(res => res.map(r => r.result)),
        map(countResultToStatData),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isPaymentsCountLoading$ = progress(this.searchParams$, this.paymentsCount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    paymentsCountError$ = this.paymentsCountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(
            this.searchParams$,
            this.paymentsCount$,
            this.isPaymentsCountLoading$,
            this.paymentsCountError$
        ).subscribe();
    }

    searchParamsChanges(searchParams: SearchParamsForCurrentAndPreviousPeriod) {
        this.searchParams$.next(searchParams);
    }
}
