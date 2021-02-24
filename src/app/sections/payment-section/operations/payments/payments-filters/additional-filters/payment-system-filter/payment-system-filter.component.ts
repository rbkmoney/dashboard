import { Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

import { PAYMENT_SYSTEMS } from './consts';
import { PaymentSystemFilterValue } from './types/payment-system-filter-value';

@Component({
    selector: 'dsh-payment-system-filter',
    templateUrl: './payment-system-filter.component.html',
    styleUrls: ['./payment-system-filter.component.scss'],
})
export class PaymentSystemFilterComponent {
    @Input() control: FormControl<PaymentSystemFilterValue>;

    paymentSystems: PaymentSystemFilterValue[] = PAYMENT_SYSTEMS.slice();
}
