import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

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

    refunds$: Observable<RefundSearchResult[]>;

    hasMoreRefunds$: Observable<boolean>;

    localePath = 'sections.paymentDetails.refunds';

    private dialogSub: Subscription = Subscription.EMPTY;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        public refundsService: RefundsService,
        private dialog: MatDialog
    ) {}

    ngOnChanges() {
        this.refundsService.initRefunds();
        this.refunds$ = this.refundsService.refunds();
        this.hasMoreRefunds$ = this.refundsService.hasMoreRefunds();
        this.loadMore();
    }

    loadMore() {
        this.refundsService.loadRefunds(this.invoiceID, this.paymentID);
    }

    createRefundDialog() {
        this.dialog.open(CreateRefundComponent, {
            data: {
                shopID: this.shopID,
                invoiceID: this.invoiceID,
                paymentID: this.paymentID
            } as CreateRefundData,
            width: '450px',
            disableClose: true
        });
    }
}
