import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { SearchParamsForCurrentAndPreviousPeriod } from '../utils';
import { StatsService } from './stats.service';

@Component({
    selector: 'dsh-stats',
    templateUrl: './stats.component.html',
    providers: [StatsService]
})
export class StatsComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParamsForCurrentAndPreviousPeriod;

    paymentsAmount$ = this.statsService.paymentsAmount$;
    isPaymentsAmountLoading$ = this.statsService.isPaymentsAmountLoading$;
    paymentsAmountError$ = this.statsService.paymentsAmountError$;

    refundsAmount$ = this.statsService.refundsAmount$;
    isRefundsAmountLoading$ = this.statsService.isRefundsAmountLoading$;
    refundsAmountError$ = this.statsService.refundsAmountError$;

    averagePayment$ = this.statsService.averagePayment$;
    isAveragePaymentLoading$ = this.statsService.isAveragePaymentLoading$;
    averagePaymentError$ = this.statsService.averagePaymentError$;

    paymentsCount$ = this.statsService.paymentsCount$;
    isPaymentsCountLoading$ = this.statsService.isPaymentsCountLoading$;
    paymentsCountError$ = this.statsService.paymentsCountError$;

    constructor(private statsService: StatsService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.searchParams.currentValue !== changes.searchParams.previousValue) {
            this.statsService.searchParamsChanges(this.searchParams);
        }
    }
}
