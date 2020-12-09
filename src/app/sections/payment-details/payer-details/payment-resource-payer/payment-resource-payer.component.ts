import { Component, Inject, Input } from '@angular/core';

import { PaymentResourcePayer } from '@dsh/api-codegen/capi';

import { LAYOUT_GAP } from '../../../constants';

@Component({
    selector: 'dsh-payment-resource-payer',
    templateUrl: 'payment-resource-payer.component.html',
})
export class PaymentResourcePayerComponent {
    @Input() paymentResourcePayer: PaymentResourcePayer;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
