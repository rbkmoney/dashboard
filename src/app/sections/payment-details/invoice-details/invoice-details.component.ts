import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice, InvoiceStatus } from '../../../api/capi/swagger-codegen';
import { Color } from '../../../status';
import { StatusViewInfo } from '../status-details-item/status-details-item.component';
import { InvoiceDetailsService } from './invoice-details.service';

@Component({
    selector: 'dsh-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.scss'],
    providers: [InvoiceDetailsService]
})
export class InvoiceDetailsComponent implements OnInit {
    @Input() invoiceID: string;

    @Input() layoutGap = '20px';

    invoice$: Observable<Invoice>;

    localePath = 'sections.paymentDetails.invoiceDetails';

    constructor(private invoiceDetailsService: InvoiceDetailsService) {}

    ngOnInit() {
        this.invoice$ = this.invoiceDetailsService.getInvoiceByID(this.invoiceID);
    }

    getStatusViewInfo(status: InvoiceStatus.StatusEnum, localePath = `common.invoiceStatus`): StatusViewInfo {
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
