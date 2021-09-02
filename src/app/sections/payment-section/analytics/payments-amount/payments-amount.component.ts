import { Component, Input } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { SearchParams } from '../search-params';
import { PaymentsAmountService } from './payments-amount.service';

@Component({
    selector: 'dsh-payments-amount',
    templateUrl: 'payments-amount.component.html',
    providers: [PaymentsAmountService],
})
export class PaymentsAmountComponent {
    @Input() spinnerType: SpinnerType;

    @Input() set searchParams(params: SearchParams) {
        this.paymentsAmountService.updateSearchParams(params);
    }

    paymentsAmount$ = this.paymentsAmountService.paymentsAmount$;
    isLoading$ = this.paymentsAmountService.isLoading$;
    error$ = this.paymentsAmountService.error$;

    constructor(private paymentsAmountService: PaymentsAmountService) {}
}
