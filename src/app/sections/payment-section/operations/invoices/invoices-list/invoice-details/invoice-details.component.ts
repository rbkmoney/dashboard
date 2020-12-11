import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Invoice } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-invoice-invoice-details',
    templateUrl: 'invoice-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDetailsComponent {
    @Input() invoice: Invoice;
    @Output() refreshData = new EventEmitter<void>();
}
