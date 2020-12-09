import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { RefundSearchResult } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-refund-status-filter',
    templateUrl: 'refund-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundStatusFilterComponent {
    @Input() selected?: RefundSearchResult.StatusEnum;
    @Output() selectedChange = new EventEmitter<RefundSearchResult.StatusEnum>();
    statuses = Object.values(RefundSearchResult.StatusEnum);
}
