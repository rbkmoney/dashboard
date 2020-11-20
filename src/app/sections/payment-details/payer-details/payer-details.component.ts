import { Component, Inject, Input } from '@angular/core';

import { Payer, PaymentResourcePayer } from '../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';

export enum PayerType {
    CustomerPayer = 'CustomerPayer',
    PaymentResourcePayer = 'PaymentResourcePayer',
    RecurrentPayer = 'RecurrentPayer',
}

@Component({
    selector: 'dsh-payer-details',
    templateUrl: 'payer-details.component.html',
})
export class PayerDetailsComponent {
    @Input() payer: Payer;

    PayerType = PayerType;

    payerEmail: string;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    paymentResourcePayer(): PaymentResourcePayer | null {
        return this.payer.payerType === PayerType.PaymentResourcePayer ? (this.payer as PaymentResourcePayer) : null;
    }
}
