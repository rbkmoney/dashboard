import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import isEqual from 'lodash.isequal';
import { combineLatest, forkJoin, merge, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/analytics';

import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { searchParamsToStatSearchParams } from '../utils';
import { countResultToStatData } from './count-result-to-stat-data';

@Injectable()
export class PaymentsCountService {
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
    private paymentsCountOrError$ = this.searchParams$.pipe(
        withLatestFrom(this.route.params.pipe(pluck('realm'))),
        switchMap(([{ current, previous }, paymentInstitutionRealm]) =>
            forkJoin([
                this.analyticsService.getPaymentsCount(current.fromTime, current.toTime, {
                    paymentInstitutionRealm,
                    shopIDs: current.shopIDs,
                }),
                this.analyticsService.getPaymentsCount(previous.fromTime, previous.toTime, {
                    paymentInstitutionRealm,
                    shopIDs: previous.shopIDs,
                }),
            ]).pipe(replaceError)
        )
    );
    paymentsCountResult$ = this.paymentsCountOrError$.pipe(
        filterPayload,
        map((res) => res.map((r) => r.result)),
        map(countResultToStatData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    paymentsCount$ = combineLatest([this.paymentsCountResult$, this.currencyChange$]).pipe(
        map(([result, currency]) => result.find((r) => r.currency === currency))
    );
    isLoading$ = progress(this.searchParams$, this.paymentsCount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    error$ = this.paymentsCountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService, private route: ActivatedRoute) {
        merge(this.searchParams$, this.paymentsCount$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.initialSearchParams$.next(searchParams);
    }
}
