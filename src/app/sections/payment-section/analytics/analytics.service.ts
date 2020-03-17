import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { AnalyticsService as APIAnalyticsService } from '../../../api';
import { SearchParams } from './search-params';
import { ChartData, paymentsSplitAmountToChartData, paymentsSplitCountToChartData, StatData } from './utils';
import { PaymentsToolDistributionResult } from '../../../api-codegen/anapi/swagger-codegen';

@Injectable()
export class AnalyticsService {

    private searchParams$ = new Subject<SearchParams>();

    paymentsAmount$: Observable<StatData> = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getPaymentsAmount(fromTime, toTime, shopIDs)
        ),
        pluck('result'),
        map(data => data.find(d => d.currency === 'RUB')),
    );

    refundsAmount$: Observable<StatData> = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getRefundsAmount(fromTime, toTime, shopIDs)
        ),
        pluck('result'),
        map(data => data.find(d => d.currency === 'RUB'))
    );

    averagePayment$: Observable<StatData> = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getAveragePayment(fromTime, toTime, shopIDs)
        ),
        pluck('result'),
        map(data => data.find(d => d.currency === 'RUB'))
    );

    paymentsCount$: Observable<StatData> = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getPaymentsCount(fromTime, toTime, shopIDs)
        ),
        pluck('result'),
        map(data => data.find(d => d.currency === 'RUB'))
    );

    paymentsSplitCount$: Observable<ChartData> = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getPaymentsSplitCount(fromTime, toTime, splitCount, shopIDs)
        ),
        pluck('result'),
        map(paymentsSplitCountToChartData),
        map(data => data.find(d => d.currency === 'RUB'))
    );

    paymentsSplitAmount$: Observable<ChartData> = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getPaymentsSplitAmount(fromTime, toTime, splitCount, shopIDs)
        ),
        pluck('result'),
        map(paymentsSplitAmountToChartData),
        map(data => data.find(d => d.currency === 'RUB'))
    );

    paymentsToolDistribution$: Observable<PaymentsToolDistributionResult> = this.searchParams$.pipe(
        switchMap(({ fromTime, toTime, shopIDs }) =>
            this.analyticsService.getPaymentsToolDistribution(fromTime, toTime, shopIDs)
        ),
        pluck('result'),
        map(data => data.find(d => d.currency === 'RUB'))
    );

    constructor(private analyticsService: APIAnalyticsService) {}

    formValueChanges(formValue: SearchParams) {
        this.searchParams$.next(formValue);
    }

}
