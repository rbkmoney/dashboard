import { Injectable } from '@angular/core';
import moment from 'moment';
import { forkJoin, merge, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api/analytics';
import { progress, SHARE_REPLAY_CONF, takeError } from '../../../../custom-operators';
import { SearchParamsWithSplitUnit } from '../search-params-with-split-unit';
import { paymentsSplitAmountToChartData, paymentsSplitCountToChartData } from '../utils';

@Injectable()
export class StatsBarsService {
    private searchParams$ = new Subject<SearchParamsWithSplitUnit>();

    paymentsSplitCount$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, splitUnit, shopIDs }) =>
            forkJoin(of(fromTime), this.analyticsService.getPaymentsSplitCount(fromTime, toTime, splitUnit, shopIDs))
        ),
        map(([fromTime, { result }]) => paymentsSplitCountToChartData(result, moment(fromTime))),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isPaymentsSplitCountLoading$ = progress(this.searchParams$, this.paymentsSplitCount$).pipe(
        shareReplay(SHARE_REPLAY_CONF)
    );
    paymentsSplitCountError$ = this.paymentsSplitCount$.pipe(takeError, shareReplay(SHARE_REPLAY_CONF));

    paymentsSplitAmount$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, splitUnit, shopIDs }) =>
            forkJoin(of(fromTime), this.analyticsService.getPaymentsSplitAmount(fromTime, toTime, splitUnit, shopIDs))
        ),
        map(([fromTime, { result }]) => paymentsSplitAmountToChartData(result, moment(fromTime))),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isPaymentsSplitAmountLoading$ = progress(this.searchParams$, this.paymentsSplitAmount$).pipe(
        shareReplay(SHARE_REPLAY_CONF)
    );
    paymentsSplitAmountError$ = this.paymentsSplitAmount$.pipe(takeError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(
            this.paymentsSplitCount$,
            this.isPaymentsSplitCountLoading$,
            this.paymentsSplitCountError$,
            this.paymentsSplitAmount$,
            this.isPaymentsSplitAmountLoading$,
            this.paymentsSplitAmountError$
        ).subscribe();
    }

    searchParamsChanges(searchParams: SearchParamsWithSplitUnit) {
        this.searchParams$.next(searchParams);
    }
}
