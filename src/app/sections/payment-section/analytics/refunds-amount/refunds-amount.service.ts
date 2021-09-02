import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/utils';
import isEqual from 'lodash-es/isEqual';
import { combineLatest, forkJoin, merge, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/analytics';

import { filterError, filterPayload, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { amountResultToStatData, searchParamsToStatSearchParams } from '../utils';

@Injectable()
export class RefundsAmountService {
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
    private refundsAmountOrError$ = this.searchParams$.pipe(
        switchMap(({ current, previous, realm }) =>
            forkJoin([
                this.analyticsService.getRefundsAmount(current.fromTime, current.toTime, {
                    paymentInstitutionRealm: realm,
                    shopIDs: current.shopIDs,
                }),
                this.analyticsService.getRefundsAmount(previous.fromTime, previous.toTime, {
                    paymentInstitutionRealm: realm,
                    shopIDs: previous.shopIDs,
                }),
            ]).pipe(replaceError)
        )
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    refundsAmountResult$ = this.refundsAmountOrError$.pipe(
        filterPayload,
        map((res) => res.map((r) => r.result)),
        map(amountResultToStatData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    refundsAmount$ = combineLatest([this.refundsAmountResult$, this.currencyChange$]).pipe(
        map(([result, currency]) => result.find((r) => r.currency === currency))
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = progress(this.searchParams$, this.refundsAmount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    // eslint-disable-next-line @typescript-eslint/member-ordering
    error$ = this.refundsAmountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(this.searchParams$, this.refundsAmount$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams): void {
        this.initialSearchParams$.next(searchParams);
    }
}
