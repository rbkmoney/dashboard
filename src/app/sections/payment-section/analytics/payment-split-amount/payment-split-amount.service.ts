import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { progress } from '@rbkmoney/utils';
import isEqual from 'lodash.isequal';
import { combineLatest, forkJoin, merge, of, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/analytics';

import { filterError, filterPayload, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { searchParamsToParamsWithSplitUnit } from '../utils';
import { prepareSplitAmount } from './prepare-split-amount';
import { splitAmountToChartData } from './split-amount-to-chart-data';

@Injectable()
export class PaymentSplitAmountService {
    private initialSearchParams$ = new Subject<SearchParams>();
    private searchParams$ = this.initialSearchParams$.pipe(
        map(searchParamsToParamsWithSplitUnit),
        distinctUntilChanged(isEqual),
        shareReplay(SHARE_REPLAY_CONF)
    );
    private currencyChange$ = this.initialSearchParams$.pipe(
        pluck('currency'),
        distinctUntilChanged(),
        shareReplay(SHARE_REPLAY_CONF)
    );
    private splitAmountOrError$ = this.searchParams$.pipe(
        withLatestFrom(this.route.params.pipe(pluck('realm'))),
        switchMap(([{ fromTime, toTime, splitUnit, shopIDs }, paymentInstitutionRealm]) =>
            forkJoin([
                of(fromTime),
                of(toTime),
                this.analyticsService.getPaymentsSplitAmount(fromTime, toTime, splitUnit, {
                    paymentInstitutionRealm,
                    shopIDs,
                }),
            ]).pipe(replaceError)
        )
    );
    private splitAmountResult$ = this.splitAmountOrError$.pipe(
        filterPayload,
        map(([fromTime, toTime, splitAmount]) => prepareSplitAmount(splitAmount?.result, fromTime, toTime)),
        map(splitAmountToChartData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    splitAmount$ = combineLatest([this.splitAmountResult$, this.currencyChange$]).pipe(
        map(([result, currency]) => result.find((r) => r.currency === currency))
    );
    isLoading$ = progress(this.searchParams$, this.splitAmount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    error$ = this.splitAmountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService, private route: ActivatedRoute) {
        merge(this.splitAmount$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.initialSearchParams$.next(searchParams);
    }
}
