import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { barChartColor } from '../../../../../styles/chart-colors';
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

    color = barChartColor;

    constructor(private paymentSplitAmountService: PaymentSplitAmountService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.paymentSplitAmountService.updateSearchParams(this.searchParams);
        }
    }
}
