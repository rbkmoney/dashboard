import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Invoice, InvoiceCart } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-invoice-invoice-details',
    templateUrl: 'invoice-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDetailsComponent {
    @Input() invoice: Invoice;
    @Output() refreshData = new EventEmitter<void>();

    isActionsAvailable(status: Invoice.StatusEnum): boolean {
        return ['paid', 'unpaid'].includes(status);
    }

    isCartAvailable(cart: InvoiceCart): boolean {
        return Boolean(cart?.length);
    }
}
