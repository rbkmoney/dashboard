import { Component } from '@angular/core';

import { PaymentsService } from './payments.service';
import { PaymentSearchFormValue } from './search-form/payment-search-form-value';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [PaymentsService]
})
export class PaymentsComponent {
    payments$ = this.paymentService.searchResult();
    hasMorePayments$ = this.paymentService.hasMore();
    lastUpdated$ = this.paymentService.lastUpdated$;

    constructor(private paymentService: PaymentsService) {}

    search(val: PaymentSearchFormValue) {
        this.paymentService.search(val);
    }

    fetchMore() {
        this.paymentService.fetchMore();
    }

    refresh() {
        this.paymentService.refresh();
    }
}
