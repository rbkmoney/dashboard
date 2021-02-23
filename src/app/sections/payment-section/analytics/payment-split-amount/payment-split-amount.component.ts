import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { ChartsThemeProvider, CHARTS_THEME } from '../charts-theme';
import { SearchParams } from '../search-params';
import { PaymentSplitAmountService } from './payment-split-amount.service';

@Component({
    selector: 'dsh-payment-split-amount',
    templateUrl: 'payment-split-amount.component.html',
    providers: [PaymentSplitAmountService],
})
export class PaymentSplitAmountComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    splitAmount$ = this.paymentSplitAmountService.splitAmount$;
    isLoading$ = this.paymentSplitAmountService.isLoading$;
    error$ = this.paymentSplitAmountService.error$;

    color = this.theme.barChart;

    constructor(private paymentSplitAmountService: PaymentSplitAmountService, @Inject(CHARTS_THEME) private theme: ChartsThemeProvider) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.paymentSplitAmountService.updateSearchParams(this.searchParams);
        }
    }
}
