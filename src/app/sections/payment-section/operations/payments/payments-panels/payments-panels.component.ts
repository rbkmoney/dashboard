import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import isEmpty from 'lodash.isempty';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

import { getPaymentId } from '../utils/get-payment-id';

@Component({
    selector: 'dsh-payments-panels',
    templateUrl: 'payments-panels.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPanelsComponent {
    @Input() list: PaymentSearchResult[];
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;
    @Input() expandedId: number;

    @Output() showMore = new EventEmitter<void>();
    @Output() expandedIdChanged = new EventEmitter<number>();

    get isEmptyList(): boolean {
        return isEmpty(this.list);
    }

    trackPayment(index: number, item: PaymentSearchResult): string {
        return `${getPaymentId(item)}${item.status}`;
    }

    showMoreElements(): void {
        this.showMore.emit();
    }

    expandedIndexChange(id: number): void {
        this.expandedIdChanged.emit(id);
    }
}
