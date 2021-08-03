import { Component, Input } from '@angular/core';
import isObject from 'lodash-es/isObject';

import { PaymentResourcePayer, PaymentSearchResult, Payer } from '@dsh/api-codegen/anapi';

import { CommonPayer } from './types/common-payer';
import { PaymentAdditionalInfo } from './types/payment-additional-info';

@Component({
    selector: 'dsh-payment-main-info',
    templateUrl: './payment-main-info.component.html',
    styleUrls: ['./payment-main-info.component.scss'],
})
export class PaymentMainInfoComponent {
    @Input() payment: PaymentSearchResult;

    get payer(): CommonPayer {
        return this.payment.payer as CommonPayer;
    }

    get resourcePayer(): PaymentResourcePayer | null {
        return this.payer.payerType === Payer.PayerTypeEnum.PaymentResourcePayer
            ? (this.payer as PaymentResourcePayer)
            : null;
    }

    get additionalInfo(): PaymentAdditionalInfo | null {
        return isObject(this.payment.transactionInfo) || typeof this.payment.externalID === 'string'
            ? {
                  transactionInfo: this.payment.transactionInfo,
                  externalID: this.payment.externalID,
              }
            : null;
    }
}
