import { Component, Input, OnChanges } from '@angular/core';

import {
    PaymentToolDetails,
    PaymentToolDetailsBankCard,
    PaymentToolDetailsDigitalWallet,
    PaymentToolDetailsPaymentTerminal
} from '../../../api/capi/swagger-codegen';

enum PaymentToolDetailsType {
    BankCard = 'PaymentToolDetailsBankCard',
    Wallet = 'PaymentToolDetailsDigitalWallet',
    Terminal = 'PaymentToolDetailsPaymentTerminal'
}

@Component({
    selector: 'dsh-payment-tool',
    templateUrl: './payment-tool.component.html'
})
export class PaymentToolComponent implements OnChanges {
    @Input() paymentToolDetails: PaymentToolDetails;

    bankCard: PaymentToolDetailsBankCard;
    digitalWallet: PaymentToolDetailsDigitalWallet;
    paymentTerminal: PaymentToolDetailsPaymentTerminal;

    localePath = 'sections.paymentDetails.paymentTool';

    ngOnChanges() {
        if (this.paymentToolDetails) {
            switch (this.paymentToolDetails.detailsType) {
                case PaymentToolDetailsType.BankCard:
                    this.bankCard = this.paymentToolDetails as PaymentToolDetailsBankCard;
                    break;
                case PaymentToolDetailsType.Wallet:
                    this.digitalWallet = this.paymentToolDetails as PaymentToolDetailsDigitalWallet;
                    break;
                case PaymentToolDetailsType.Terminal:
                    this.paymentTerminal = this.paymentToolDetails as PaymentToolDetailsPaymentTerminal;
                    break;
            }
        }
    }
}
