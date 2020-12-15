import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import isNil from 'lodash.isnil';

import { Payment } from '../../../../types/payment';

@Component({
    selector: 'dsh-payments-row',
    templateUrl: 'payments-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsRowComponent {
    @Input() payment: Payment;

    get isPaymentExist(): boolean {
        return !isNil(this.payment);
    }
}
