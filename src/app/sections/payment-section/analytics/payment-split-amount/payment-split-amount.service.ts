import { Injectable } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api/analytics';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { searchParamsToParamsWithSplitUnit } from '../utils';
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
            this.analyticsService.getPaymentsSplitAmount(fromTime, toTime, splitUnit, shopIDs).pipe(replaceError)
        )
    );
    splitAmount$ = this.splitAmountOrError$.pipe(
        filterPayload,
        pluck('result'),
        map(splitAmountToChartData),
        map(data => data.find(d => d.currency === 'RUB')),
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
