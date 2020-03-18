import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

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

    ngOnChanges({ item }: SimpleChanges): void {
        this.tax = item.currentValue.taxMode as InvoiceLineTaxVAT;
    }
}
