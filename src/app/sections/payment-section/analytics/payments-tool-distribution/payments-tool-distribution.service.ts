import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import isEqual from 'lodash.isequal';
import { merge, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';

import { AnalyticsService } from '@dsh/api/analytics';

import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { SearchParams } from '../search-params';
import { searchParamsToDistributionSearchParams } from '../utils';
import { paymentsToolDistributionToChartData } from './payments-tool-distribution-to-chart-data';

@Injectable()
export class PaymentsToolDistributionService {
    private initSearchParams$ = new Subject<SearchParams>();
    private searchParams$ = this.initSearchParams$.pipe(
        map(searchParamsToDistributionSearchParams),
        distinctUntilChanged(isEqual),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private toolDistributionOrError$ = this.searchParams$.pipe(
        withLatestFrom(this.route.params.pipe(pluck('realm'))),
        switchMap(([{ fromTime, toTime, shopIDs }, paymentInstitutionRealm]) =>
            this.analyticsService
                .getPaymentsToolDistribution(fromTime, toTime, { paymentInstitutionRealm, shopIDs })
                .pipe(replaceError)
        )
    );
    toolDistribution$ = this.toolDistributionOrError$.pipe(
        filterPayload,
        pluck('result'),
        map(paymentsToolDistributionToChartData),
        shareReplay(SHARE_REPLAY_CONF)
    );
    isLoading$ = progress(this.searchParams$, this.toolDistribution$).pipe(shareReplay(SHARE_REPLAY_CONF));
    error$ = this.toolDistributionOrError$.pipe(filterError, shareReplay(SHARE_REPLAY_CONF));

    constructor(private analyticsService: AnalyticsService, private route: ActivatedRoute) {
        merge(this.toolDistribution$, this.isLoading$, this.error$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.initSearchParams$.next(searchParams);
    }
}
