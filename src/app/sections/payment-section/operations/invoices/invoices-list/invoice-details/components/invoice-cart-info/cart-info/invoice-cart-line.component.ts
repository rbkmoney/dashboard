import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { InvoiceLine } from '../../../../../../../../../api-codegen/anapi';
import { ReceiveInvoiceService } from '../../../services/receive-invoice/receive-invoice.service';

@Component({
    selector: 'dsh-invoice-cart-line',
    templateUrl: 'invoice-cart-line.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReceiveInvoiceService],
})
export class InvoiceCartLineComponent {
    @Input() line: InvoiceLine;
    @Input() currency: string;
}
