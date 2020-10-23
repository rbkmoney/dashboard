import { Injectable } from '@angular/core';
import { forkJoin, merge, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api/analytics';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { searchParamsToParamsWithSplitUnit } from '../utils';
import { prepareSplitAmount } from './prepare-split-amount';
import { splitAmountToChartData } from './split-amount-to-chart-data';

@Injectable()
export class PaymentSplitAmountService {
    private initialSearchParams$ = new Subject<SearchParams>();
    private searchParams$ = this.initialSearchParams$.pipe(
        map(searchParamsToParamsWithSplitUnit),
        shareReplay(SHARE_REPLAY_CONF)
    );
    private splitAmountOrError$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, splitUnit, shopIDs }) =>
            forkJoin([
                of(fromTime),
                of(toTime),
                this.analyticsService.getPaymentsSplitAmount(fromTime, toTime, splitUnit, shopIDs),
            ]).pipe(replaceError)
        )
    );
    splitAmount$ = this.splitAmountOrError$.pipe(
        filterPayload,
        map(([fromTime, toTime, splitAmount]) => prepareSplitAmount(splitAmount?.result, fromTime, toTime)),
        map(splitAmountToChartData),
        withLatestFrom(this.initialSearchParams$),
        map(([data, searchParams]) => data.find((d) => d.currency === searchParams.currency)),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isLoading$ = progress(this.searchParams$, this.splitAmount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    error$ = this.splitAmountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(this.splitAmount$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.initialSearchParams$.next(searchParams);
    }
}
