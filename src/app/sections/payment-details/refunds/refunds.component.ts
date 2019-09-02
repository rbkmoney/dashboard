import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

import { RefundsService } from './refunds.service';
import { LAYOUT_GAP } from '../../constants';
import { CreateRefundComponent, CreateRefundData } from './create-refund/create-refund.component';

@Component({
    selector: 'dsh-refunds',
    templateUrl: './refunds.component.html',
    styleUrls: ['./refunds.component.scss'],
    providers: [RefundsService]
})
export class RefundsComponent implements OnChanges {
    @Input() invoiceID: string;

    @Input() paymentID: string;

    @Input() shopID: string;

    @Input() refundMaxAmount: number;

    localePath = 'sections.paymentDetails.refunds';

    refunds$ = this.refundsService.searchResult$;
    hasMoreRefunds$ = this.refundsService.hasMore$;

    console = console;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        public refundsService: RefundsService,
        private dialog: MatDialog
    ) {}

    ngOnChanges({ invoiceID, paymentID }: SimpleChanges) {
        if (invoiceID.currentValue !== invoiceID.previousValue && paymentID.currentValue !== paymentID.previousValue) {
            this.refundsService.search({ invoiceID: invoiceID.currentValue, paymentID: paymentID.currentValue });
        }
    }

    fetchMore() {
        this.refundsService.fetchMore();
    }

    createRefundDialog() {
        this.dialog.open(CreateRefundComponent, {
            data: {
                shopID: this.shopID,
                invoiceID: this.invoiceID,
                paymentID: this.paymentID,
                refundMaxAmount: this.refundMaxAmount
            } as CreateRefundData,
            width: '450px',
            disableClose: true
        });
    }
}
