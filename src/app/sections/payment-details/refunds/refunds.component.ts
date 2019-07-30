import { Component, Input, OnInit } from '@angular/core';

import { RefundsService } from './refunds.service';

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

    constructor(public refundsService: RefundsService) {}

    ngOnInit() {
        this.refundsService.loadRefunds(this.invoiceID, this.paymentID);
    }
}
