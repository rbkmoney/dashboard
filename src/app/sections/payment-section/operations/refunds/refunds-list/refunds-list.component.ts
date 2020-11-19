import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RefundSearchResult } from '../../../../../api-codegen/anapi/swagger-codegen';

@Component({
    selector: 'dsh-refunds-list',
    templateUrl: 'refunds-list.component.html',
})
export class RefundsListComponent {
    @Input() refunds: RefundSearchResult[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange: EventEmitter<number> = new EventEmitter();
    @Output() refreshData: EventEmitter<void> = new EventEmitter();
}
