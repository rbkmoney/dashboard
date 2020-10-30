import { Injectable } from '@angular/core';
import isEqual from 'lodash.isequal';
import { combineLatest, forkJoin, merge, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { amountResultToStatData, searchParamsToStatSearchParams } from '../utils';

@Injectable()
export class PaymentsAmountService {
    private initialSearchParams$ = new Subject<SearchParams>();
    private searchParams$ = this.initialSearchParams$.pipe(
        map(searchParamsToStatSearchParams),
        distinctUntilChanged(isEqual),
        shareReplay(SHARE_REPLAY_CONF)
    );
    private currencyChange$ = this.initialSearchParams$.pipe(
        pluck('currency'),
        distinctUntilChanged(),
        shareReplay(SHARE_REPLAY_CONF)
    );
    private paymentsAmountOrError$ = this.searchParams$.pipe(
        switchMap(({ current, previous }) =>
            forkJoin([
                this.analyticsService.getPaymentsAmount(current.fromTime, current.toTime, current.shopIDs),
                this.analyticsService.getPaymentsAmount(previous.fromTime, previous.toTime, previous.shopIDs),
            ]).pipe(replaceError)
        )
    );
    paymentsAmountResult$ = this.paymentsAmountOrError$.pipe(
        filterPayload,
        map((res) => res.map((r) => r.result)),
        map(amountResultToStatData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    paymentsAmount$ = combineLatest([this.paymentsAmountResult$, this.currencyChange$]).pipe(
        map(([result, currency]) => result.find((r) => r.currency === currency))
    );
    isLoading$ = progress(this.searchParams$, this.paymentsAmount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    error$ = this.paymentsAmountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(this.searchParams$, this.paymentsAmount$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.initialSearchParams$.next(searchParams);
    }
}
