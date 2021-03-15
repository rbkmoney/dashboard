import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Deposit } from '@dsh/api-codegen/wallet-api/swagger-codegen';

@Component({
    selector: 'dsh-deposits-list',
    templateUrl: 'deposits-list.component.html',
})
export class DepositsListComponent {
    @Input() deposits: Deposit[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange = new EventEmitter<number>();
    @Output() refreshData = new EventEmitter<void>();
}
