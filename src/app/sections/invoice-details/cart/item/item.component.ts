import { Component, Input, Inject } from '@angular/core';

import { InvoiceLine } from '../../../../api-codegen/anapi/swagger-codegen';
import { LAYOUT_GAP } from '../../../constants';

@Component({
    selector: 'dsh-cart-item',
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.scss']
})
export class ItemComponent {
    @Input()
    item: InvoiceLine;

    @Input()
    currency: string;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
