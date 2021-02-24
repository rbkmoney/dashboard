import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

import { PaymentStatus } from '@dsh/api-codegen/anapi';

import { PAYMENT_STATUSES_LIST } from './consts';
import { PaymentStatusFilterValue } from './types/payment-status-filter-value';

@Component({
    selector: 'dsh-payment-status-filter',
    templateUrl: './payment-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentStatusFilterComponent {
    @Input() control: FormControl<PaymentStatusFilterValue>;

    statuses: PaymentStatus.StatusEnum[] = PAYMENT_STATUSES_LIST;
}
