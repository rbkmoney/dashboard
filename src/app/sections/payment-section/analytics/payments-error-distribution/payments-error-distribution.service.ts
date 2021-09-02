import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/utils';
import isEqual from 'lodash-es/isEqual';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay, switchMap, tap } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/analytics';

import { filterError, filterPayload, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { searchParamsToDistributionSearchParams } from '../utils';
import { errorsDistributionToChartData } from './errors-distribution-to-chart-data';
import { filterSubError } from './filter-sub-error';
import { getErrorTitle } from './get-error-title';
import { subErrorsToErrorDistribution } from './sub-errors-to-error-distribution';

@Injectable()
export class PaymentsErrorDistributionService {
    private initSearchParams$ = new Subject<SearchParams>();
    private searchParams$ = this.initSearchParams$.pipe(
        map(searchParamsToDistributionSearchParams),
        distinctUntilChanged(isEqual),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private selectedSubError$ = new BehaviorSubject<number[]>([]);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    currentErrorTitle$ = new Subject<string>();

    private errorDistributionOrError$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs, realm }) =>
            this.analyticsService
                .getPaymentsSubErrorDistribution(fromTime, toTime, { paymentInstitutionRealm: realm, shopIDs })
                .pipe(replaceError)
        )
    );

    private errorDistribution$ = this.errorDistributionOrError$.pipe(
        filterPayload,
        pluck('result'),
        map(subErrorsToErrorDistribution),
        shareReplay(SHARE_REPLAY_CONF)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    chartData$ = merge(this.errorDistribution$, this.selectedSubError$).pipe(
        switchMap(() => this.errorDistribution$),
        tap((d) => this.currentErrorTitle$.next(getErrorTitle(d, this.selectedSubError$.getValue()))),
        map((d) => filterSubError(d, this.selectedSubError$.getValue())),
        map(errorsDistributionToChartData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = progress(this.searchParams$, this.errorDistribution$).pipe(shareReplay(SHARE_REPLAY_CONF));
    // eslint-disable-next-line @typescript-eslint/member-ordering
    error$ = this.errorDistributionOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(this.errorDistribution$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.initSearchParams$.next(searchParams);
    }

    updateDataSelection(value: number) {
        this.selectedSubError$.next(this.selectedSubError$.getValue().concat(value));
    }

    goBackDataSelection() {
        this.selectedSubError$.next(this.selectedSubError$.getValue().slice(0, -1));
    }
}
