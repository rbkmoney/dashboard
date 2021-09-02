import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/utils';
import isEqual from 'lodash-es/isEqual';
import { combineLatest, forkJoin, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/analytics';

import { filterError, filterPayload, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { amountResultToStatData, searchParamsToStatSearchParams, StatStatSearchParams } from '../utils';

@Injectable()
export class PaymentsAmountService {
    private initialSearchParams$ = new Subject<SearchParams>();
    private searchParams$: Observable<StatStatSearchParams> = this.initialSearchParams$.pipe(
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
        switchMap(({ current, previous, realm }) =>
            forkJoin([
                this.analyticsService.getPaymentsAmount(current.fromTime, current.toTime, {
                    shopIDs: current.shopIDs,
                    paymentInstitutionRealm: realm,
                }),
                this.analyticsService.getPaymentsAmount(previous.fromTime, previous.toTime, {
                    shopIDs: previous.shopIDs,
                    paymentInstitutionRealm: realm,
                }),
            ]).pipe(replaceError)
        )
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    paymentsAmountResult$ = this.paymentsAmountOrError$.pipe(
        filterPayload,
        map((res) => res.map((r) => r.result)),
        map(amountResultToStatData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    paymentsAmount$ = combineLatest([this.paymentsAmountResult$, this.currencyChange$]).pipe(
        map(([result, currency]) => result.find((r) => r.currency === currency))
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = progress(this.searchParams$, this.paymentsAmount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    // eslint-disable-next-line @typescript-eslint/member-ordering
    error$ = this.paymentsAmountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(this.searchParams$, this.paymentsAmount$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams): void {
        this.initialSearchParams$.next(searchParams);
    }
}
