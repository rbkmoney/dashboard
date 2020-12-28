import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import isNil from 'lodash.isnil';

import { Payment } from '../../../../../../types/payment';

@Component({
    selector: 'dsh-payment-fee',
    templateUrl: 'payment-fee.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentFeeComponent {
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
}
