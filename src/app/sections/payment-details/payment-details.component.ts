import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import get from 'lodash.get';

import { PaymentSearchResult, PaymentToolDetails } from '../../api/capi/swagger-codegen';
import { PaymentDetailsService } from './payment-details.service';
import { PayerType } from './payer-details/payer-details.component';

@Component({
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss'],
    providers: [PaymentDetailsService]
})
export class PaymentDetailsComponent implements OnInit {
    payment$: Observable<PaymentSearchResult>;

    PayerType = PayerType;

    constructor(private paymentDetailsService: PaymentDetailsService) {}

    ngOnInit() {
        this.payment$ = this.paymentDetailsService.getPayment();
    }

    getPaymentToolDetails(payment: PaymentSearchResult): PaymentToolDetails {
        return get(payment, 'payer.paymentToolDetails') as PaymentToolDetails;
    }
}
