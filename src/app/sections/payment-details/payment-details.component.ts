import { Component } from '@angular/core';
import get from 'lodash-es/get';

import { PaymentFlow, PaymentSearchResult, PaymentToolDetails } from '@dsh/api-codegen/capi/swagger-codegen';

import { PayerType } from './payer-details';
import { ReceivePaymentService } from './receive-payment.service';

@Component({
    templateUrl: 'payment-details.component.html',
    styleUrls: ['./payment-details.component.scss'],
    providers: [ReceivePaymentService],
})
export class PaymentDetailsComponent {
    payment$ = this.receivePaymentService.payment$;
    isLoading$ = this.receivePaymentService.isLoading$;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    PayerType = PayerType;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    PaymentFlow = PaymentFlow.TypeEnum;

    constructor(private receivePaymentService: ReceivePaymentService) {}

    getPaymentToolDetails(payment: PaymentSearchResult): PaymentToolDetails {
        return get(payment, 'payer.paymentToolDetails') as PaymentToolDetails;
    }

    holdPayment() {
        this.receivePaymentService.holdPayment();
    }
}
