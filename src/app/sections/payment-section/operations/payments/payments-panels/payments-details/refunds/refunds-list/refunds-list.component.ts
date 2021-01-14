import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import isEmpty from 'lodash.isempty';

import { RefundSearchResult } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-refunds-list',
    templateUrl: './refunds-list.component.html',
    styleUrls: ['./refunds-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundsListComponent {
    @Input() list: RefundSearchResult[];
    @Input() loading: boolean;
    @Input() hasMore: boolean;

    @Output() showMore = new EventEmitter<void>();

    get isEmptyList(): boolean {
        return isEmpty(this.list);
    }

    showMoreElements(): void {
        this.showMore.emit();
    }
}
