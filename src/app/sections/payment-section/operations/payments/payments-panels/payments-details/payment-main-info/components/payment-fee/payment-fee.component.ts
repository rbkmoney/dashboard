import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import isNil from 'lodash-es/isNil';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-payment-fee',
    templateUrl: 'payment-fee.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentFeeComponent {
    @Input()
    set payment(paymentValue: PaymentSearchResult) {
        if (isNil(paymentValue)) {
            return;
        }
        this.fee = paymentValue.fee ?? 0;
        this.currency = paymentValue.currency;
        this.feePercent = this.fee / paymentValue.amount;
    }

    fee: number;
    currency: string;
    feePercent: number;
}
