import { Component, Input, OnInit } from '@angular/core';
import isNil from 'lodash.isnil';

import { Payment } from '../../../../../../types/payment';

@Component({
    selector: 'dsh-payment-fee',
    templateUrl: './payment-fee.component.html',
})
export class PaymentFeeComponent implements OnInit {
    @Input()
    set payment(paymentValue: Payment) {
        if (isNil(paymentValue)) {
            return;
        }
        this.fee = paymentValue.fee;
        this.currency = paymentValue.currency;
        this.feePercent = paymentValue.fee / paymentValue.amount;
    }

    fee: number;
    currency: string;
    feePercent: number;

    constructor() {}

    ngOnInit(): void {}
}
