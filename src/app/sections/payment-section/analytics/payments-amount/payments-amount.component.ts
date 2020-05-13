import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { SearchParams } from '../search-params';
import { PaymentsAmountService } from './payments-amount.service';

@Component({
    selector: 'dsh-payments-amount',
    templateUrl: './payments-amount.component.html',
    providers: [PaymentsAmountService]
})
export class PaymentsAmountComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    paymentsAmount$ = this.paymentsAmountService.paymentsAmount$;
    isLoading$ = this.paymentsAmountService.isLoading$;
    error$ = this.paymentsAmountService.error$;

    constructor(private paymentsAmountService: PaymentsAmountService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.paymentsAmountService.updateSearchParams(this.searchParams);
        }
    }
}
