import { Component, Input, OnChanges } from '@angular/core';

import { RefundSearchResult } from '../../../api/capi/swagger-codegen';
import { PaymentDetailsService } from '../payment-details.service';

@Component({
    selector: 'dsh-refunds',
    templateUrl: './refunds.component.html',
    styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnChanges {
    @Input() invoiceID: string;

    @Input() paymentID: string;

    refunds: RefundSearchResult[] = [];

    totalCount = 0;

    localePath = 'sections.paymentDetails.refunds';

    constructor(private paymentDetailsService: PaymentDetailsService) {}

    ngOnChanges() {
        this.getMoreRefunds(this.invoiceID, this.paymentID);
    }

    getMoreRefunds = (invoiceID: string, paymentID: string, offset = 0) =>
        this.paymentDetailsService.getRefunds(invoiceID, paymentID, offset).subscribe(({ result, totalCount }) => {
            this.refunds.push(...result);
            this.totalCount = totalCount;
        });
}
