import { Component } from '@angular/core';

import { PaymentsService } from './payments.service';
import { PaymentSearchFormValue } from './search-form/payment-search-form-value';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [PaymentsService]
})
export class PaymentsComponent {
    payments$ = this.paymentService.payments();
    hasMorePayments$ = this.paymentService.hasMorePayments();
    lastUpdated$ = this.paymentService.lastUpdated$;

    constructor(private paymentService: PaymentsService) {}

    search(val: PaymentSearchFormValue) {
        this.paymentService.search(val);
    }

    showMore() {
        this.paymentService.showMore();
    }

    refresh() {
        this.paymentService.refresh();
    }
}
