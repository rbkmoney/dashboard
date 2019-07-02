import { Component, Input, OnInit } from '@angular/core';

import { Invoice, InvoiceStatus } from '../../../api/capi/swagger-codegen';
import { Color } from '../../../status';

@Component({
    selector: 'dsh-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
    @Input() invoice: Invoice;

    statuses = InvoiceStatus.StatusEnum;

    statusColor: Color;
    statusText: string;

    ngOnInit() {
        this.invoice = {
            status: this.statuses.Paid,
            reason: 'Хочу вернуть деньги',
            id: 'hsDw31Yeo7d',
            amount: 12300,
            product: 'Полный кектус, покупай скорее'
        } as Invoice;
        this.initStatus();
    }

    private initStatus() {
        switch (this.invoice.status) {
            case this.statuses.Paid:
                this.statusColor = Color.success;
                this.statusText = 'sections.paymentDetails.invoice.statuses.paid';
                break;
            case this.statuses.Fulfilled:
                this.statusColor = Color.success;
                this.statusText = 'sections.paymentDetails.invoice.statuses.fulfilled';
                break;
            case this.statuses.Cancelled:
                this.statusColor = Color.warn;
                this.statusText = 'sections.paymentDetails.invoice.statuses.cancelled';
                break;
            case this.statuses.Unpaid:
                this.statusColor = Color.pending;
                this.statusText = 'sections.paymentDetails.invoice.statuses.unpaid';
                break;
        }
    }
}
