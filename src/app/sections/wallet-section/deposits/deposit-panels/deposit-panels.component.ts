import { Component, EventEmitter, Input, Output } from '@angular/core';
import isEmpty from 'lodash-es/isEmpty';

import { Deposit } from '@dsh/api-codegen/wallet-api/swagger-codegen';

@Component({
    selector: 'dsh-deposit-panels',
    templateUrl: 'deposit-panels.component.html',
})
export class DepositPanelsComponent {
    @Input() list: Deposit[];
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;
    @Input() expandedId: number;

    @Output() showMore = new EventEmitter<void>();
    @Output() expandedIdChanged = new EventEmitter<number>();

    get isEmptyList(): boolean {
        return isEmpty(this.list);
    }

    track(index: number, item: Deposit): string {
        return item.id;
    }

    showMoreElements(): void {
        this.showMore.emit();
    }

    expandedIndexChange(id: number): void {
        this.expandedIdChanged.emit(id);
    }
}
