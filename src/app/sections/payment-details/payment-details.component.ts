import { Component, Inject, OnInit } from '@angular/core';
import get from 'lodash.get';

import { PaymentFlow, PaymentSearchResult, PaymentToolDetails } from '../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../constants';
import { PayerType } from './payer-details';
import { ReceivePaymentService } from './receive-payment.service';
import { RouteParamPaymentService } from './route-param-payment.service';

@Component({
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss'],
    providers: [ReceivePaymentService, RouteParamPaymentService]
})
export class PaymentDetailsComponent implements OnInit {
    payment$ = this.receivePaymentService.payment$;
    isLoading$ = this.receivePaymentService.isLoading$;

    PayerType = PayerType;
    PaymentFlow = PaymentFlow.TypeEnum;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private receivePaymentService: ReceivePaymentService) {
    }

    getPaymentToolDetails(payment: PaymentSearchResult): PaymentToolDetails {
        return get(payment, 'payer.paymentToolDetails') as PaymentToolDetails;
    }

    ngOnInit() {
        this.receivePayment();
    }

    receivePayment() {
        this.receivePaymentService.receivePayment();
    }
}
