import { Component, Input } from '@angular/core';

import { InvoiceCart } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-cart',
    templateUrl: 'cart.component.html',
})
export class CartComponent {
    @Input()
    invoiceCart: InvoiceCart;

    @Input()
    currency: string;
}
