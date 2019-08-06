import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice, InvoiceStatus } from '../../../api/capi/swagger-codegen';
import { StatusViewInfo } from '../status-details-item/status-details-item.component';
import { InvoiceDetailsService } from './invoice-details.service';
import { LAYOUT_GAP } from '../../constants';
import { StatusColor } from '../../../theme-manager';

@Component({
    selector: 'dsh-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.scss'],
    providers: [InvoiceDetailsService]
})
export class InvoiceDetailsComponent implements OnInit {
    @Input() invoiceID: string;

    invoice$: Observable<Invoice>;

    localePath = 'sections.paymentDetails.invoiceDetails';

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private invoiceDetailsService: InvoiceDetailsService
    ) {}

    ngOnInit() {
        this.invoice$ = this.invoiceDetailsService.getInvoiceByID(this.invoiceID);
    }

    getStatusViewInfo(status: InvoiceStatus.StatusEnum): StatusViewInfo {
        const localePath = `common.invoiceStatus`;
        const statusEnum = InvoiceStatus.StatusEnum;
        switch (status) {
            case statusEnum.Paid:
                return { color: StatusColor.success, text: `${localePath}.paid` };
            case statusEnum.Fulfilled:
                return { color: StatusColor.success, text: `${localePath}.fulfilled` };
            case statusEnum.Cancelled:
                return { color: StatusColor.warn, text: `${localePath}.cancelled` };
            case statusEnum.Unpaid:
                return { color: StatusColor.pending, text: `${localePath}.unpaid` };
        }
    }
}
