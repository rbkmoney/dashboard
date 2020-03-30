import { Injectable } from '@angular/core';
import { forkJoin, merge, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api';
import { progress, SHARE_REPLAY_CONF, takeError } from '../../../../custom-operators';
import { amountResultToStatData, countResultToStatData, SearchParamsForCurrentAndPreviousPeriod } from '../utils';

@Injectable()
export class StatsService {
    private searchParams$ = new Subject<SearchParamsForCurrentAndPreviousPeriod>();

    paymentsAmount$ = this.searchParams$.pipe(
        switchMap(({ current, previous }) =>
            forkJoin(
                this.analyticsService.getPaymentsAmount(current.fromTime, current.toTime, current.shopIDs),
                this.analyticsService.getPaymentsAmount(previous.fromTime, previous.toTime, previous.shopIDs)
            )
        ),
        map(res => res.map(r => r.result)),
        map(amountResultToStatData),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isPaymentsAmountLoading$ = progress(this.searchParams$, this.paymentsAmount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    paymentsAmountError$ = this.paymentsAmount$.pipe(
        takeError,
        shareReplay(SHARE_REPLAY_CONF)
    );

    refundsAmount$ = this.searchParams$.pipe(
        switchMap(({ current, previous }) =>
            forkJoin(
                this.analyticsService.getRefundsAmount(current.fromTime, current.toTime, current.shopIDs),
                this.analyticsService.getRefundsAmount(previous.fromTime, previous.toTime, previous.shopIDs)
            )
        ),
        map(res => res.map(r => r.result)),
        map(amountResultToStatData),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isRefundsAmountLoading$ = progress(this.searchParams$, this.refundsAmount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    refundsAmountError$ = this.refundsAmount$.pipe(
        takeError,
        shareReplay(SHARE_REPLAY_CONF)
    );

    averagePayment$ = this.searchParams$.pipe(
        switchMap(({ current, previous }) =>
            forkJoin(
                this.analyticsService.getAveragePayment(current.fromTime, current.toTime, current.shopIDs),
                this.analyticsService.getAveragePayment(previous.fromTime, previous.toTime, previous.shopIDs)
            )
        ),
        map(res => res.map(r => r.result)),
        map(amountResultToStatData),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isAveragePaymentLoading$ = progress(this.searchParams$, this.averagePayment$).pipe(shareReplay(SHARE_REPLAY_CONF));
    averagePaymentError$ = this.averagePayment$.pipe(
        takeError,
        shareReplay(SHARE_REPLAY_CONF)
    );

    paymentsCount$ = this.searchParams$.pipe(
        switchMap(({ current, previous }) =>
            forkJoin(
                this.analyticsService.getPaymentsCount(current.fromTime, current.toTime, current.shopIDs),
                this.analyticsService.getPaymentsCount(previous.fromTime, previous.toTime, previous.shopIDs)
            )
        ),
        map(res => res.map(r => r.result)),
        map(countResultToStatData),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isPaymentsCountLoading$ = progress(this.searchParams$, this.paymentsCount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    paymentsCountError$ = this.paymentsCount$.pipe(
        takeError,
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private analyticsService: AnalyticsService) {
        merge(
            this.searchParams$,
            this.paymentsAmount$,
            this.isPaymentsAmountLoading$,
            this.paymentsAmountError$,
            this.refundsAmount$,
            this.isRefundsAmountLoading$,
            this.refundsAmountError$,
            this.averagePayment$,
            this.isAveragePaymentLoading$,
            this.averagePaymentError$,
            this.paymentsCount$,
            this.isPaymentsCountLoading$,
            this.paymentsCountError$
        ).subscribe();
    }

    searchParamsChanges(searchParams: SearchParamsForCurrentAndPreviousPeriod) {
        this.searchParams$.next(searchParams);
    }
}
