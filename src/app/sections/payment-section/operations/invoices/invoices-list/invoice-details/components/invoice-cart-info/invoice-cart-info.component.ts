import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { InvoiceCart } from '@dsh/api-codegen/anapi';

import { ReceiveInvoiceService } from '../../services/receive-invoice/receive-invoice.service';

@Component({
    selector: 'dsh-invoice-cart-info',
    templateUrl: 'invoice-cart-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReceiveInvoiceService],
})
export class InvoiceCartInfoComponent {
    @Input() cart: InvoiceCart;
    @Input() currency: string;
}
