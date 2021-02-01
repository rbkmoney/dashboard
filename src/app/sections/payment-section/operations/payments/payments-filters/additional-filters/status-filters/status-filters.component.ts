import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

import { getAbstractControl } from '@dsh/app/shared/utils';

import { PaymentStatusFilterValue } from './types/payment-status-filter-value';
import { StatusFilters } from './types/status-filters';

@Component({
    selector: 'dsh-status-filters',
    templateUrl: './status-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusFiltersComponent {
    @Input()
    set form(formGroup: FormGroup<StatusFilters>) {
        this.statusControl = getAbstractControl<FormControl<PaymentStatusFilterValue>>(formGroup, 'paymentStatus');
    }

    statusControl: FormControl<PaymentStatusFilterValue>;
}
