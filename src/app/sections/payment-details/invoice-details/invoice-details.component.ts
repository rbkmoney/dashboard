import { Component, Inject, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice, InvoiceStatus } from '../../../api/capi/swagger-codegen';
import { StatusColor as Color } from '../../../theme-manager';
import { StatusViewInfo } from '../status-details-item';
import { InvoiceDetailsService } from './invoice-details.service';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.scss'],
    providers: [InvoiceDetailsService]
})
export class InvoiceDetailsComponent implements OnChanges {
    @Input() invoiceID: string;

    invoice$: Observable<Invoice>;

    localePath = 'sections.paymentDetails.invoiceDetails';

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private invoiceDetailsService: InvoiceDetailsService) {}

    ngOnChanges() {
        this.invoice$ = this.invoiceDetailsService.getInvoiceByID(this.invoiceID);
    }

    getStatusViewInfo(status: InvoiceStatus.StatusEnum): StatusViewInfo {
        const localePath = `common.invoiceStatus`;
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
