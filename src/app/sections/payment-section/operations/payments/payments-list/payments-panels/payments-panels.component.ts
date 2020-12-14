import { Component, EventEmitter, Input, Output } from '@angular/core';
import isEmpty from 'lodash.isempty';

import { Payment } from '../../types/payment';

@Component({
    selector: 'dsh-payments-panels',
    templateUrl: 'payments-panels.component.html',
})
export class PaymentsPanelsComponent {
    @Input() list: Payment[];
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;

    @Output() showMore = new EventEmitter<void>();

    expandedId: number;

    get isEmptyList(): boolean {
        return isEmpty(this.list);
    }

    showMoreElements(): void {
        this.showMore.emit();
    }

    expandedIdChange(id: number): void {
        this.expandedId = id;
    }
}
