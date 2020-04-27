import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { SearchParams } from '../search-params';
import { AveragePaymentService } from './average-payment.service';
import { PaymentsAmountService } from './payments-amount.service';
import { PaymentsCountService } from './payments-count.service';
import { RefundsAmountService } from './refunds-amount.service';

@Component({
    selector: 'dsh-stats',
    templateUrl: './stats.component.html',
    providers: [AveragePaymentService, PaymentsAmountService, RefundsAmountService, PaymentsCountService]
})
export class StatsComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    paymentsAmount$ = this.paymentsAmountService.paymentsAmount$;
    isPaymentsAmountLoading$ = this.paymentsAmountService.isPaymentsAmountLoading$;
    paymentsAmountError$ = this.paymentsAmountService.paymentsAmountError$;

    refundsAmount$ = this.refundsAmountService.refundsAmount$;
    isRefundsAmountLoading$ = this.refundsAmountService.isRefundsAmountLoading$;
    refundsAmountError$ = this.refundsAmountService.refundsAmountError$;

    averagePayment$ = this.averagePaymentService.averagePayment$;
    isAveragePaymentLoading$ = this.averagePaymentService.isAveragePaymentLoading$;
    averagePaymentError$ = this.averagePaymentService.averagePaymentError$;

    paymentsCount$ = this.paymentsCountService.paymentsCount$;
    isPaymentsCountLoading$ = this.paymentsCountService.isPaymentsCountLoading$;
    paymentsCountError$ = this.paymentsCountService.paymentsCountError$;

    constructor(
        private paymentsAmountService: PaymentsAmountService,
        private refundsAmountService: RefundsAmountService,
        private averagePaymentService: AveragePaymentService,
        private paymentsCountService: PaymentsCountService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.paymentsAmountService.updateSearchParams(this.searchParams);
            this.refundsAmountService.updateSearchParams(this.searchParams);
            this.averagePaymentService.updateSearchParams(this.searchParams);
            this.paymentsCountService.updateSearchParams(this.searchParams);
        }
    }
}
