import { Component, Input } from '@angular/core';

import { PaymentToolDetails } from '../../../api-codegen/capi/swagger-codegen';

enum PaymentToolDetailsType {
    BankCard = 'PaymentToolDetailsBankCard',
    Wallet = 'PaymentToolDetailsDigitalWallet',
    Terminal = 'PaymentToolDetailsPaymentTerminal'
}

@Component({
    selector: 'dsh-payment-tool',
    templateUrl: './payment-tool.component.html'
})
export class PaymentToolComponent {
    @Input() paymentToolDetails: PaymentToolDetails;

    Type = PaymentToolDetailsType;
}
