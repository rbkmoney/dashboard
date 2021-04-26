import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Invoice, InvoiceStatus } from '@dsh/api-codegen/anapi/swagger-codegen';

import { StatusColor as Color } from '../../../theme-manager';

@Component({
    selector: 'dsh-details',
    templateUrl: 'details.component.html',
})
export class DetailsComponent implements OnChanges {
    color: Color;
    status: string;

    @Input()
    invoice: Invoice;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.invoice.currentValue !== changes.invoice.previousValue) {
            this.setInfo(this.invoice.status);
        }
    }

    setInfo(status: InvoiceStatus.StatusEnum) {
        const statusEnum = InvoiceStatus.StatusEnum;
        switch (status) {
            case statusEnum.Paid:
                this.color = Color.Success;
                this.status = 'paid';
                break;
            case statusEnum.Fulfilled:
                this.color = Color.Success;
                this.status = 'fulfilled';
                break;
            case statusEnum.Cancelled:
                this.color = Color.Warn;
                this.status = 'cancelled';
                break;
            case statusEnum.Unpaid:
                this.color = Color.Pending;
                this.status = 'unpaid';
                break;
        }
    }
}
