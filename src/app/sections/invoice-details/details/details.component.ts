import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Invoice, InvoiceStatus } from '../../../api-codegen/anapi/swagger-codegen';
import { StatusColor as Color } from '../../../theme-manager';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-details',
    templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnChanges {
    color: Color;
    status: string;

    @Input()
    invoice: Invoice;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.invoice.currentValue !== changes.invoice.previousValue) {
            this.setInfo(this.invoice.status);
        }
    }

    setInfo(status: InvoiceStatus.StatusEnum) {
        const statusEnum = InvoiceStatus.StatusEnum;
        switch (status) {
            case statusEnum.Paid:
                this.color = Color.success;
                this.status = 'paid';
                break;
            case statusEnum.Fulfilled:
                this.color = Color.success;
                this.status = 'fulfilled';
                break;
            case statusEnum.Cancelled:
                this.color = Color.warn;
                this.status = 'cancelled';
                break;
            case statusEnum.Unpaid:
                this.color = Color.pending;
                this.status = 'unpaid';
                break;
        }
    }
}
