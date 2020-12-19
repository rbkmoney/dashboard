import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Invoice } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-invoices-list',
    templateUrl: 'invoices-list.component.html',
})
export class InvoicesListComponent {
    @Input() invoices: Invoice[];
    @Input() expandedId: number;
    @Input() lastUpdated: string;
    @Output() expandedIdChange = new EventEmitter<number>();
    @Output() refreshData = new EventEmitter<void>();
}
