import { Component, Input, OnInit } from '@angular/core';

import { Invoice, InvoiceStatus } from '../../../api/capi/swagger-codegen';
import { Color } from '../../../status';
import { StatusViewInfo } from '../status-detail-item/status-detail-item.component';
import { toCurrencySymbol } from '../currency-utils';

@Component({
    selector: 'dsh-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
    @Input() invoice: Invoice;

    statuses = InvoiceStatus.StatusEnum;

    localePath = 'sections.paymentDetails.invoiceDetails';

    toCurrencySymbol = toCurrencySymbol;

    ngOnInit() {
        this.invoice = {
            status: this.statuses.Paid,
            reason: 'Хочу вернуть деньги',
            id: 'hsDw31Yeo7d',
            amount: 12300,
            product: 'Полный кектус, покупай скорее',
            currency: 'RUB'
        } as Invoice;
    }

    getStatusViewInfo(): StatusViewInfo {
        const statuses = this.localePath + '.statuses';
        let color: Color;
        let text: string;
        switch (this.invoice.status) {
            case this.statuses.Paid:
                color = Color.success;
                text = statuses + '.paid';
                break;
            case this.statuses.Fulfilled:
                color = Color.success;
                text = statuses + '.fulfilled';
                break;
            case this.statuses.Cancelled:
                color = Color.warn;
                text = statuses + '.cancelled';
                break;
            case this.statuses.Unpaid:
                color = Color.pending;
                text = statuses + '.unpaid';
                break;
        }
        return { color, text };
    }
}
