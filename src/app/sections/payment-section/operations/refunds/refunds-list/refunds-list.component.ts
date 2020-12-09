import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RefundSearchResult } from '@dsh/api-codegen/anapi/swagger-codegen';

@Component({
    selector: 'dsh-refunds-list',
    templateUrl: 'refunds-list.component.html',
})
export class RefundsListComponent {
    @Input() refunds: RefundSearchResult[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange = new EventEmitter<number>();
    @Output() refreshData = new EventEmitter<void>();
}
