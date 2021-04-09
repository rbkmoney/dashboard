import { Component, Input } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';

import { PaymentSumFilter } from './types/payment-sum-filter';

@Component({
    selector: 'dsh-payment-sum-filter',
    templateUrl: './payment-sum-filter.component.html',
    styleUrls: ['./payment-sum-filter.component.scss'],
})
export class PaymentSumFilterComponent {
    @Input() form: FormGroup<PaymentSumFilter>;
}
