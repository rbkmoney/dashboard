import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RefundsService } from './refunds.service';
import { LAYOUT_GAP } from '../../constants';
import { RefundSearchResult } from '../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-refunds',
    templateUrl: './refunds.component.html',
    styleUrls: ['./refunds.component.scss'],
    providers: [RefundsService]
})
export class RefundsComponent implements OnInit {
    @Input() invoiceID: string;

    @Input() paymentID: string;

    refunds$: Observable<RefundSearchResult[]>;

    hasMoreRefunds$: Observable<boolean>;

    localePath = 'sections.paymentDetails.refunds';

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        public refundsService: RefundsService
    ) {}

    ngOnInit() {
        this.refunds$ = this.refundsService.refunds();
        this.hasMoreRefunds$ = this.refundsService.hasMoreObservable();
        this.loadMore();
    }

    loadMore() {
        this.refundsService.loadRefunds(this.invoiceID, this.paymentID);
    }
}
