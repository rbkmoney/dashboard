import { Component, Input, OnInit } from '@angular/core';

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
export class PaymentToolComponent implements OnInit {
    @Input() paymentToolDetails: PaymentToolDetails;

    bankCard: PaymentToolDetailsBankCard;
    digitalWallet: PaymentToolDetailsDigitalWallet;
    paymentTerminal: PaymentToolDetailsPaymentTerminal;

    paymentSystems = PaymentToolDetailsBankCard.PaymentSystemEnum;

    private localePath = 'sections.paymentDetails.paymentTool';

    ngOnInit() {
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

    getFormattedBankCard = (): string => this.bankCard.cardNumberMask.replace(/(.{4})/g, '$& ');
}
