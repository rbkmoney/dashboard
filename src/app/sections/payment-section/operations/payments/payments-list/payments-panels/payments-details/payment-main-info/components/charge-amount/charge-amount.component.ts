import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import isNil from 'lodash.isnil';

import { Payment } from '../../../../../../types/payment';

@Component({
    selector: 'dsh-charge-amount',
    templateUrl: 'charge-amount.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargeAmountComponent {
    @Input()
    set payment(paymentValue: Payment) {
        if (isNil(paymentValue)) {
            return;
        }
        this.chargeAmount = paymentValue.amount - paymentValue.fee;
        this.currency = paymentValue.currency;
    }

    chargeAmount: number;
    currency: string;
}
