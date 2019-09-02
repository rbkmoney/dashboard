import { Component, Inject, Input } from '@angular/core';

import { PaymentResourcePayer } from '../../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../../constants';

@Component({
    selector: 'dsh-payment-resource-payer',
    templateUrl: './payment-resource-payer.component.html'
})
export class PaymentResourcePayerComponent {
    @Input() paymentResourcePayer: PaymentResourcePayer;

    localePath = 'sections.paymentDetails.payerDetails';

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
