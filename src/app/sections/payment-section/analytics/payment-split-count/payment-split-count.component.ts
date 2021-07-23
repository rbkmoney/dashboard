import { Component, Inject, Input, OnChanges } from '@angular/core';
import { ComponentChanges } from '@rbkmoney/utils';

import { SpinnerType } from '@dsh/components/indicators';

import { ChartsThemeProvider, CHARTS_THEME } from '../charts-theme';
import { SearchParams } from '../search-params';
import { PaymentSplitCountService } from './payment-split-count.service';

@Component({
    selector: 'dsh-payment-split-count',
    templateUrl: 'payment-split-count.component.html',
    providers: [PaymentSplitCountService],
})
export class PaymentSplitCountComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    splitCount$ = this.paymentSplitCountService.splitCount$;
    isLoading$ = this.paymentSplitCountService.isLoading$;
    error$ = this.paymentSplitCountService.error$;

    colors = this.theme.stackedBarChart;

    constructor(
        private paymentSplitCountService: PaymentSplitCountService,
        @Inject(CHARTS_THEME) private theme: ChartsThemeProvider
    ) {}

    ngOnChanges({ searchParams }: ComponentChanges<PaymentSplitCountComponent>): void {
        if (searchParams.currentValue && searchParams.currentValue !== searchParams.previousValue) {
            this.paymentSplitCountService.updateSearchParams(this.searchParams);
        }
    }
}
