import { Component, Input } from '@angular/core';

import { PaymentResourcePayer } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-payment-resource-payer',
    templateUrl: 'payment-resource-payer.component.html',
})
export class PaymentResourcePayerComponent {
    @Input() paymentResourcePayer: PaymentResourcePayer;
}
