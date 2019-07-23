import { Component, Input, OnChanges } from '@angular/core';

import {
    PaymentToolDetails,
    PaymentToolDetailsBankCard,
    PaymentToolDetailsDigitalWallet,
    PaymentToolDetailsPaymentTerminal
} from '../../../api/capi/swagger-codegen';

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
                case 'PaymentToolDetailsBankCard':
                    this.bankCard = this.paymentToolDetails as PaymentToolDetailsBankCard;
                    break;
                case 'PaymentToolDetailsDigitalWallet':
                    this.digitalWallet = this.paymentToolDetails as PaymentToolDetailsDigitalWallet;
                    break;
                case 'PaymentToolDetailsPaymentTerminal':
                    this.paymentTerminal = this.paymentToolDetails as PaymentToolDetailsPaymentTerminal;
                    break;
            }
        }
    }
}
