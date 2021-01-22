import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import isNil from 'lodash.isnil';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-charge-amount',
    templateUrl: 'charge-amount.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargeAmountComponent {
    @Input()
    set payment(paymentValue: PaymentSearchResult) {
        if (isNil(paymentValue)) {
            return;
        }
        const fee = paymentValue.fee ?? 0;
        this.chargeAmount = paymentValue.amount - fee;
        this.currency = paymentValue.currency;
    }

    chargeAmount: number;
    currency: string;
}
