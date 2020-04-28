import { Injectable } from '@angular/core';
import { forkJoin, merge, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { countResultToStatData, searchParamsToStatSearchParams } from '../utils';

@Injectable()
export class PaymentsCountService {
    private initialSearchParams$ = new Subject<SearchParams>();
    private searchParams$ = this.initialSearchParams$.pipe(
        map(searchParamsToStatSearchParams),
        shareReplay(SHARE_REPLAY_CONF)
    );

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
    isLoading$ = progress(this.searchParams$, this.paymentsCount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    error$ = this.paymentsCountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(this.searchParams$, this.paymentsCount$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.initialSearchParams$.next(searchParams);
    }
}
