import { Component, Input } from '@angular/core';

import { Payer, PaymentResourcePayer } from '@dsh/api-codegen/capi/swagger-codegen';

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

    paymentResourcePayer(): PaymentResourcePayer | null {
        return this.payer.payerType === PayerType.PaymentResourcePayer ? (this.payer as PaymentResourcePayer) : null;
    }
}
