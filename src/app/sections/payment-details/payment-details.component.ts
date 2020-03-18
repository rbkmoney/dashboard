import { Component, Inject } from '@angular/core';
import get from 'lodash.get';

import { PaymentFlow, PaymentSearchResult, PaymentToolDetails } from '../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../constants';
import { PayerType } from './payer-details';
import { PaymentDetailsService } from './payment-details.service';

@Component({
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss'],
    providers: [PaymentDetailsService]
})
export class PaymentDetailsComponent {
    payment$ = this.paymentDetailsService.payment$;

    PayerType = PayerType;
    PaymentFlow = PaymentFlow.TypeEnum;

    constructor(private paymentDetailsService: PaymentDetailsService, @Inject(LAYOUT_GAP) public layoutGap: string) {}

    getPaymentToolDetails(payment: PaymentSearchResult): PaymentToolDetails {
        return get(payment, 'payer.paymentToolDetails') as PaymentToolDetails;
    }
}
