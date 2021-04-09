import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { InvoiceLine, InvoiceLineTaxVAT } from '@dsh/api-codegen/anapi/swagger-codegen';

@Component({
    selector: 'dsh-cart-item',
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.scss'],
})
export class ItemComponent implements OnChanges {
    @Input()
    item: InvoiceLine;

    @Input()
    currency: string;

    tax: InvoiceLineTaxVAT;

    ngOnChanges({ item }: SimpleChanges): void {
        this.tax = item.currentValue.taxMode as InvoiceLineTaxVAT;
    }
}
