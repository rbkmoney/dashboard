import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { progress } from '@rbkmoney/utils';
import isEqual from 'lodash-es/isEqual';
import { combineLatest, forkJoin, merge, of, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/analytics';

import { filterError, filterPayload, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { searchParamsToParamsWithSplitUnit } from '../utils';
import { prepareSplitCount } from './prepare-split-count';
import { splitCountToChartData } from './split-count-to-chart-data';

@Injectable()
export class PaymentSplitCountService {
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
    private splitCountOrError$ = this.searchParams$.pipe(
        withLatestFrom(this.route.params.pipe(pluck('realm'))),
        switchMap(([{ fromTime, toTime, splitUnit, shopIDs }, paymentInstitutionRealm]) =>
            forkJoin([
                of(fromTime),
                of(toTime),
                this.analyticsService.getPaymentsSplitCount(fromTime, toTime, splitUnit, {
                    paymentInstitutionRealm,
                    shopIDs,
                }),
            ]).pipe(replaceError)
        )
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    splitCountResult$ = this.splitCountOrError$.pipe(
        filterPayload,
        map(([fromTime, toTime, splitCount]) => prepareSplitCount(splitCount?.result, fromTime, toTime)),
        map(splitCountToChartData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    splitCount$ = combineLatest([this.splitCountResult$, this.currencyChange$]).pipe(
        map(([result, currency]) => result.find((r) => r.currency === currency))
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = progress(this.searchParams$, this.splitCount$).pipe(shareReplay(SHARE_REPLAY_CONF));
    // eslint-disable-next-line @typescript-eslint/member-ordering
    error$ = this.splitCountOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService, private route: ActivatedRoute) {
        merge(this.splitCount$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams): void {
        this.initialSearchParams$.next(searchParams);
    }
}
