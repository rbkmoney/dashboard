import { Injectable } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api/analytics';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParamsWithSplitUnit } from '../search-params-with-split-unit';
import { paymentsSplitAmountToChartData, paymentsSplitCountToChartData } from '../utils';

@Injectable()
export class StatsBarsService {
    private searchParams$ = new Subject<SearchParamsWithSplitUnit>();

    private splitCountOrError$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, splitUnit, shopIDs }) =>
            this.analyticsService.getPaymentsSplitCount(fromTime, toTime, splitUnit, shopIDs).pipe(replaceError)
        )
    );
    splitCount$ = this.splitCountOrError$.pipe(
        filterPayload,
        pluck('result'),
        map(paymentsSplitCountToChartData),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isSplitCountLoading$ = progress(this.searchParams$, this.splitCount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    splitCountError$ = this.splitCountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    private splitAmountOrError$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, splitUnit, shopIDs }) =>
            this.analyticsService.getPaymentsSplitAmount(fromTime, toTime, splitUnit, shopIDs).pipe(replaceError)
        )
    );
    splitAmount$ = this.splitAmountOrError$.pipe(
        filterPayload,
        pluck('result'),
        map(paymentsSplitAmountToChartData),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isSplitAmountLoading$ = progress(this.searchParams$, this.splitAmount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    splitAmountError$ = this.splitAmountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(
            this.splitCount$,
            this.isSplitCountLoading$,
            this.splitCountError$,
            this.splitAmount$,
            this.isSplitAmountLoading$,
            this.splitAmountError$
        ).subscribe();
    }

    searchParamsChanges(searchParams: SearchParamsWithSplitUnit) {
        this.searchParams$.next(searchParams);
    }
}
