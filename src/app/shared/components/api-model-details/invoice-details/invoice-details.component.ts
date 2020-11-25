import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Invoice } from '../../../../api-codegen/anapi/swagger-codegen';

@Component({
    selector: 'dsh-invoice-details',
    templateUrl: 'invoice-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDetailsComponent {
    @Input() invoice: Invoice;
}
