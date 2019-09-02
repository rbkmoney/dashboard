import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { RefundsService } from './refunds.service';
import { LAYOUT_GAP } from '../../constants';
import { RefundSearchResult } from '../../../api/capi/swagger-codegen';
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

    refunds$: Observable<RefundSearchResult[]>;

    hasMoreRefunds$: Observable<boolean>;

    localePath = 'sections.paymentDetails.refunds';

    refunds$ = this.refundsService.searchResult$;
    hasMoreRefunds$ = this.refundsService.hasMore$;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, public refundsService: RefundsService) {}
    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        public refundsService: RefundsService,
        private dialog: MatDialog
    ) {}

    ngOnChanges({ invoiceID, paymentID }: SimpleChanges) {
        if (invoiceID.currentValue && paymentID.currentValue) {
            this.refundsService.search({ invoiceID: invoiceID.currentValue, paymentID: paymentID.currentValue });
        }
    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.invoiceID.currentValue !== changes.invoiceID.previousValue &&
            changes.paymentID.currentValue !== changes.paymentID.previousValue &&
            changes.shopID.currentValue !== changes.shopID.previousValue
        ) {
            this.refundsService.initRefunds();
            this.refunds$ = this.refundsService.refunds();
            this.hasMoreRefunds$ = this.refundsService.hasMoreRefunds();
            this.loadMore();
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
