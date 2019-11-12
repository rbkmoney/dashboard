import { Component, Input, Inject, OnChanges, SimpleChanges } from '@angular/core';

import { InvoiceLine, InvoiceLineTaxVAT } from '../../../../api-codegen/anapi/swagger-codegen';
import { LAYOUT_GAP } from '../../../constants';

@Component({
    selector: 'dsh-cart-item',
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.scss']
})
export class ItemComponent implements OnChanges {
    @Input()
    item: InvoiceLine;

    @Input()
    currency: string;

    tax: InvoiceLineTaxVAT;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.item.previousValue !== changes.item.currentValue) {
            this.tax = changes.item.currentValue.taxMode as InvoiceLineTaxVAT;
        }
    }
}
