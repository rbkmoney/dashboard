import { Component, Inject, Input } from '@angular/core';

import { PaymentResourcePayer } from '@dsh/api-codegen/capi';
import { LAYOUT_GAP } from '@dsh/app/sections/constants';

import { PayerType } from '../../../../../../../payment-details/payer-details';
import { Payment } from '../../../../types/payment';

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
}
