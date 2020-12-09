import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Invoice } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-invoice-invoice-details',
    templateUrl: 'invoice-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDetailsComponent {
    @Input() invoice: Invoice;
}
