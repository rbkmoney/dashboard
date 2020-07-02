import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap, tap } from 'rxjs/operators';

import { AnalyticsService } from '../../../../api/analytics';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { errorsDistributionToChartData } from './errors-distribution-to-chart-data';
import { filterSubError } from './filter-sub-error';
import { getErrorTitle } from './get-error-title';
import { subErrorsToErrorDistribution } from './sub-errors-to-error-distribution';

@Injectable()
export class PaymentsErrorDistributionService {
    private searchParams$ = new Subject<SearchParams>();

    private selectedSubError$ = new BehaviorSubject<number[]>([]);

    currentErrorTitle$ = new Subject<string>();

    private errorDistributionOrError$ = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getPaymentsSubErrorDistribution(fromTime, toTime, shopIDs).pipe(replaceError)
        )
    );

    private errorDistribution$ = this.errorDistributionOrError$.pipe(
        filterPayload,
        pluck('result'),
        map(subErrorsToErrorDistribution),
        shareReplay(SHARE_REPLAY_CONF)
    );

    chartData$ = merge(this.errorDistribution$, this.selectedSubError$).pipe(
        switchMap(() => this.errorDistribution$),
        tap((d) => this.currentErrorTitle$.next(getErrorTitle(d, this.selectedSubError$.getValue()))),
        map((d) => filterSubError(d, this.selectedSubError$.getValue())),
        map(errorsDistributionToChartData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isLoading$ = progress(this.searchParams$, this.errorDistribution$).pipe(shareReplay(SHARE_REPLAY_CONF));
    error$ = this.errorDistributionOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService) {
        merge(this.errorDistribution$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }

    updateDataSelection(value: number) {
        this.selectedSubError$.next(this.selectedSubError$.getValue().concat(value));
    }

    goBackDataSelection() {
        this.selectedSubError$.next(this.selectedSubError$.getValue().slice(0, -1));
    }
}
