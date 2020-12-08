import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Invoice } from '../../../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-invoice-row',
    templateUrl: 'invoice-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceRowComponent {
    @Input() invoice: Invoice;
}
