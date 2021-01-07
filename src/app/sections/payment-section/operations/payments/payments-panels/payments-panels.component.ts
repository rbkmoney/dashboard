import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import isEmpty from 'lodash.isempty';

import { Payment } from '../types/payment';

@Component({
    selector: 'dsh-payments-panels',
    templateUrl: 'payments-panels.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPanelsComponent {
    @Input() list: Payment[];
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;
    @Input() expandedId: number;

    @Output() showMore = new EventEmitter<void>();
    @Output() expandedIdChanged = new EventEmitter<number>();

    get isEmptyList(): boolean {
        return isEmpty(this.list);
    }

    showMoreElements(): void {
        this.showMore.emit();
    }

    expandedIndexChange(id: number): void {
        this.expandedIdChanged.emit(id);
    }
}
