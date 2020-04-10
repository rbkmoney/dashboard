import { Injectable } from '@angular/core';
import { forkJoin, merge, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { amountResultToStatData, SearchParamsForCurrentAndPreviousPeriod } from '../utils';

@Injectable()
export class RefundsAmountService {
    private searchParams$ = new Subject<SearchParamsForCurrentAndPreviousPeriod>();

    private refundsAmountOrError$ = this.searchParams$.pipe(
        switchMap(({ current, previous }) =>
            forkJoin(
                this.analyticsService.getRefundsAmount(current.fromTime, current.toTime, current.shopIDs),
                this.analyticsService.getRefundsAmount(previous.fromTime, previous.toTime, previous.shopIDs)
            ).pipe(replaceError)
        )
    );
    refundsAmount$ = this.refundsAmountOrError$.pipe(
        filterPayload,
        map(res => res.map(r => r.result)),
        map(amountResultToStatData),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isRefundsAmountLoading$ = progress(this.searchParams$, this.refundsAmount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    refundsAmountError$ = this.refundsAmountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(
            this.searchParams$,
            this.refundsAmount$,
            this.isRefundsAmountLoading$,
            this.refundsAmountError$
        ).subscribe();
    }

    searchParamsChanges(searchParams: SearchParamsForCurrentAndPreviousPeriod) {
        this.searchParams$.next(searchParams);
    }
}
