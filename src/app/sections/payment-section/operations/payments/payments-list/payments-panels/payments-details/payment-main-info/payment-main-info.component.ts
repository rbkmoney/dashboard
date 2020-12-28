import { Component, Inject, Input } from '@angular/core';
import isObject from 'lodash.isobject';
import isString from 'lodash.isstring';

import { PaymentResourcePayer } from '@dsh/api-codegen/capi';
import { LAYOUT_GAP } from '@dsh/app/sections/tokens';

import { PayerType } from '../../../../../../../payment-details/payer-details';
import { Payment } from '../../../../types/payment';
import { PaymentAdditionalInfo } from './types/payment-additional-info';

@Component({
    selector: 'dsh-payment-main-info',
    templateUrl: './payment-main-info.component.html',
    styleUrls: ['./payment-main-info.component.scss'],
})
export class PaymentMainInfoComponent {
    @Input() payment: Payment;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    get resourcePayer(): PaymentResourcePayer | null {
        return this.payment.payer.payerType === PayerType.PaymentResourcePayer
            ? (this.payment.payer as PaymentResourcePayer)
            : null;
    }

    get additionalInfo(): PaymentAdditionalInfo | null {
        return isObject(this.payment.transactionInfo) || isString(this.payment.externalID)
            ? {
                  transactionInfo: this.payment.transactionInfo,
                  externalID: this.payment.externalID,
              }
            : null;
    }
}
