import { Component, Input } from '@angular/core';

import { PaymentToolDetails } from '@dsh/api-codegen/capi';
import { PaymentToolDetailsType } from '@dsh/api/capi';

@Component({
    selector: 'dsh-payment-tool',
    templateUrl: 'payment-tool.component.html',
})
export class PaymentToolComponent {
    @Input() paymentToolDetails: PaymentToolDetails;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    Type = PaymentToolDetailsType;
}
