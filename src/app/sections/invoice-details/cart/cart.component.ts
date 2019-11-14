import { Component, Input, Inject } from '@angular/core';

import { InvoiceCart } from '../../../api-codegen/anapi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-cart',
    templateUrl: 'cart.component.html'
})
export class CartComponent {
    @Input()
    invoiceCart: InvoiceCart;

    @Input()
    currency: string;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
