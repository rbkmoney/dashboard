import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import get from 'lodash.get';

import { PaymentFlow, PaymentSearchResult, PaymentToolDetails } from '../../api/capi/swagger-codegen';
import { PaymentDetailsService } from './payment-details.service';
import { PayerType } from './payer-details';
import { LAYOUT_GAP } from '../constants';

@Component({
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss'],
    providers: [PaymentDetailsService]
})
export class PaymentDetailsComponent implements OnInit {
    payment$: Observable<PaymentSearchResult>;

    PayerType = PayerType;
    PaymentFlow = PaymentFlow.TypeEnum;

    constructor(private paymentDetailsService: PaymentDetailsService, @Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnInit() {
        this.payment$ = this.paymentDetailsService.getPayment();
    }

    getPaymentToolDetails(payment: PaymentSearchResult): PaymentToolDetails {
        return get(payment, 'payer.paymentToolDetails') as PaymentToolDetails;
    }
}
