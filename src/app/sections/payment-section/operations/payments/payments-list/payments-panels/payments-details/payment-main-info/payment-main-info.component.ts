import { Component, Inject, Input, OnInit } from '@angular/core';

import { PaymentResourcePayer } from '@dsh/api-codegen/capi';
import { LAYOUT_GAP } from '@dsh/app/sections/constants';

import { PayerType } from '../../../../../../../payment-details/payer-details';
import { Payment } from '../../../../types/payment';

@Component({
    selector: 'dsh-payment-main-info',
    templateUrl: './payment-main-info.component.html',
    styleUrls: ['./payment-main-info.component.scss'],
})
export class PaymentMainInfoComponent implements OnInit {
    @Input() payment: Payment;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    get chargeAmount(): number {
        return this.payment.amount - this.payment.fee;
    }

    get feePercent(): number {
        return this.payment.fee / this.payment.amount;
    }

    get resourcePayer(): PaymentResourcePayer | null {
        return this.payment.payer.payerType === PayerType.PaymentResourcePayer
            ? (this.payment.payer as PaymentResourcePayer)
            : null;
    }

    ngOnInit(): void {}
}
