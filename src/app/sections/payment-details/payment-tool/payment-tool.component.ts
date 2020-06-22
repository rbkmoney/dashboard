import { Component, Input } from '@angular/core';

import { PaymentToolDetailsType } from '../../../api';
import { PaymentToolDetails } from '../../../api-codegen/capi';

@Component({
    selector: 'dsh-payment-tool',
    templateUrl: './payment-tool.component.html',
})
export class PaymentToolComponent {
    @Input() paymentToolDetails: PaymentToolDetails;

    Type = PaymentToolDetailsType;
}
