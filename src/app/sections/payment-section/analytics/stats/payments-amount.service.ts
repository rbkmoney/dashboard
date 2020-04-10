import { Injectable } from '@angular/core';
import { forkJoin, merge, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { amountResultToStatData, SearchParamsForCurrentAndPreviousPeriod } from '../utils';

@Injectable()
export class PaymentsAmountService {
    private searchParams$ = new Subject<SearchParamsForCurrentAndPreviousPeriod>();

    private paymentsAmountOrError$ = this.searchParams$.pipe(
        switchMap(({ current, previous }) =>
            forkJoin(
                this.analyticsService.getPaymentsAmount(current.fromTime, current.toTime, current.shopIDs),
                this.analyticsService.getPaymentsAmount(previous.fromTime, previous.toTime, previous.shopIDs)
            ).pipe(replaceError)
        )
    );
    paymentsAmount$ = this.paymentsAmountOrError$.pipe(
        filterPayload,
        map(res => res.map(r => r.result)),
        map(amountResultToStatData),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isPaymentsAmountLoading$ = progress(this.searchParams$, this.paymentsAmount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    paymentsAmountError$ = this.paymentsAmountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(
            this.searchParams$,
            this.paymentsAmount$,
            this.isPaymentsAmountLoading$,
            this.paymentsAmountError$
        ).subscribe();
    }

    searchParamsChanges(searchParams: SearchParamsForCurrentAndPreviousPeriod) {
        this.searchParams$.next(searchParams);
    }
}
