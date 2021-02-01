import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

import { PaymentStatus } from '@dsh/api-codegen/anapi';

import { PAYMENT_STATUSES_LIST } from '../../consts';
import { PaymentStatusFilterValue } from '../../types/payment-status-filter-value';

const DEFAULT_SHOWN_ITEMS = 2;
const STATUS_CHOICE_IN_ROW = 2;
const INDEX_ITEM_SLICE_COEFFICIENT = 1;

@Component({
    selector: 'dsh-payment-status-filter',
    templateUrl: './payment-status-filter.component.html',
    styleUrls: ['./payment-status-filter.component.scss'],
})
export class PaymentStatusFilterComponent implements OnInit {
    @Input() control: FormControl<PaymentStatusFilterValue>;

    availableStatuses: PaymentStatus.StatusEnum[];
    isAllStatusesVisible: boolean;

    ngOnInit(): void {
        this.initAvailableStatuses();
        this.checkIsAllStatusesAvailable();
    }

    showAllStatuses(): void {
        this.availableStatuses = PAYMENT_STATUSES_LIST.slice();
        this.checkIsAllStatusesAvailable();
    }

    private initAvailableStatuses(): void {
        const initIndex = PAYMENT_STATUSES_LIST.indexOf(this.control.value);
        const initItemsSlice =
            (initIndex + INDEX_ITEM_SLICE_COEFFICIENT) % STATUS_CHOICE_IN_ROW === 0
                ? initIndex + INDEX_ITEM_SLICE_COEFFICIENT
                : initIndex + STATUS_CHOICE_IN_ROW;
        const shownItems = initItemsSlice >= DEFAULT_SHOWN_ITEMS ? initItemsSlice : DEFAULT_SHOWN_ITEMS;

        this.availableStatuses = PAYMENT_STATUSES_LIST.slice(0, shownItems);
    }

    private checkIsAllStatusesAvailable(): void {
        this.isAllStatusesVisible = this.availableStatuses.length === PAYMENT_STATUSES_LIST.length;
    }
}
