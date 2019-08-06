import { Component, Inject, Input, OnInit } from '@angular/core';

import { RefundsService } from './refunds.service';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-refunds',
    templateUrl: './refunds.component.html',
    styleUrls: ['./refunds.component.scss'],
    providers: [RefundsService]
})
export class RefundsComponent implements OnInit {
    @Input() invoiceID: string;

    @Input() paymentID: string;

    localePath = 'sections.paymentDetails.refunds';

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        public refundsService: RefundsService
    ) {}

    ngOnInit() {
        this.refundsService.loadRefunds(this.invoiceID, this.paymentID);
    }
}
