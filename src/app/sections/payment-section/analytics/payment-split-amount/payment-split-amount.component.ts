import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { SearchParams } from '../search-params';
import { PaymentSplitAmountService } from './payment-split-amount.service';

@Component({
    selector: 'dsh-payment-split-amount',
    templateUrl: './payment-split-amount.component.html',
    providers: [PaymentSplitAmountService]
})
export class PaymentSplitAmountComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    splitAmount$ = this.statsBarsService.splitAmount$;
    isLoading$ = this.statsBarsService.isLoading$;
    error$ = this.statsBarsService.error$;

    constructor(private statsBarsService: PaymentSplitAmountService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.statsBarsService.updateSearchParams(this.searchParams);
        }
    }
}
