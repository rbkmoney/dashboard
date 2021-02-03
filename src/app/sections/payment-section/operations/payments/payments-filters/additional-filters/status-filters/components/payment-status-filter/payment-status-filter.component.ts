import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

import { PaymentStatus } from '@dsh/api-codegen/anapi';

import { PAYMENT_STATUSES_LIST } from '../../consts';
import { PaymentStatusFilterValue } from '../../types/payment-status-filter-value';

const DEFAULT_SHOWN_ITEMS = 2;

@Component({
    selector: 'dsh-payment-status-filter',
    templateUrl: './payment-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentStatusFilterComponent implements OnInit {
    @Input() control: FormControl<PaymentStatusFilterValue>;

    availableStatuses: PaymentStatus.StatusEnum[];
    isAllStatusesVisible: boolean;

    ngOnInit(): void {
        this.hideStatuses();
        this.checkIsAllStatusesAvailable();
    }

    toggleStatusesVisibility(): void {
        if (this.isAllStatusesVisible) {
            this.hideStatuses();
        } else {
            this.showAllStatuses();
        }
    }

    protected showAllStatuses(): void {
        this.availableStatuses = PAYMENT_STATUSES_LIST.slice();
        this.checkIsAllStatusesAvailable();
    }

    protected hideStatuses(): void {
        this.availableStatuses = PAYMENT_STATUSES_LIST.slice(0, DEFAULT_SHOWN_ITEMS);
        this.checkIsAllStatusesAvailable();
    }

    private checkIsAllStatusesAvailable(): void {
        this.isAllStatusesVisible = this.availableStatuses.length === PAYMENT_STATUSES_LIST.length;
    }
}
