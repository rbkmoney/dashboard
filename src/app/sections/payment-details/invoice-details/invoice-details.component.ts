import { Component, Input, OnInit } from '@angular/core';

import { Invoice, InvoiceStatus } from '../../../api/capi/swagger-codegen';
import { Color } from '../../../status';
import { StatusViewInfo } from '../status-details-item/status-details-item.component';

@Component({
    selector: 'dsh-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
    @Input() invoice: Invoice;

    @Input() layoutGap = '20px';

    localePath = 'sections.paymentDetails.invoiceDetails';

    statusViewInfo: StatusViewInfo;

    ngOnInit() {
        this.invoice = {
            status: InvoiceStatus.StatusEnum.Paid,
            reason: 'Хочу вернуть деньги',
            id: 'hsDw31Yeo7d',
            amount: 12300,
            product: 'Полный кектус, покупай скорее',
            currency: 'RUB'
        } as Invoice;

        this.statusViewInfo = this.getStatusViewInfo(this.invoice.status, `common.invoiceStatus`);
    }

    getStatusViewInfo(status: InvoiceStatus.StatusEnum, localePath: string): StatusViewInfo {
        const statusEnum = InvoiceStatus.StatusEnum;
        switch (status) {
            case statusEnum.Paid:
                return { color: Color.success, text: `${localePath}.paid` };
            case statusEnum.Fulfilled:
                return { color: Color.success, text: `${localePath}.fulfilled` };
            case statusEnum.Cancelled:
                return { color: Color.warn, text: `${localePath}.cancelled` };
            case statusEnum.Unpaid:
                return { color: Color.pending, text: `${localePath}.unpaid` };
        }
    }
}
