import { Injectable } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api/analytics';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { searchParamsToParamsWithSplitUnit } from '../utils';
import { splitCountToChartData } from './split-count-to-chart-data';

@Injectable()
export class PaymentSplitCountService {
    private initialSearchParams$ = new Subject<SearchParams>();
    private searchParams$ = this.initialSearchParams$.pipe(
        map(searchParamsToParamsWithSplitUnit),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private splitCountOrError$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, splitUnit, shopIDs }) =>
            this.analyticsService.getPaymentsSplitCount(fromTime, toTime, splitUnit, shopIDs).pipe(replaceError)
        )
    );
    splitCount$ = this.splitCountOrError$.pipe(
        filterPayload,
        pluck('result'),
        map(splitCountToChartData),
        map(data => data.find(d => d.currency === 'RUB')),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isLoading$ = progress(this.searchParams$, this.splitCount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    error$ = this.splitCountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(this.splitCount$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.initialSearchParams$.next(searchParams);
    }
}
