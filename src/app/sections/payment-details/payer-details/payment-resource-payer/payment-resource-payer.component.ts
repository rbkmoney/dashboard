import { Component, Input } from '@angular/core';

import { PaymentResourcePayer } from '../../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-payment-resource-payer',
    templateUrl: './payment-resource-payer.component.html'
})
export class PaymentResourcePayerComponent {
    @Input() paymentResourcePayer: PaymentResourcePayer;

    @Input() layoutGap = '20px';

    localePath = 'sections.paymentDetails.payerDetails';
}
