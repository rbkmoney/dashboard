import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RefundsService } from './refunds.service';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-refunds',
    templateUrl: './refunds.component.html',
    styleUrls: ['./refunds.component.scss'],
    providers: [RefundsService]
})
export class RefundsComponent implements OnChanges {
    @Input() invoiceID: string;
    @Input() paymentID: string;

    localePath = 'sections.paymentDetails.refunds';

    refunds$ = this.refundsService.searchResult$;
    hasMoreRefunds$ = this.refundsService.hasMore$;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, public refundsService: RefundsService) {}

    ngOnChanges({ invoiceID, paymentID }: SimpleChanges) {
        if (invoiceID.currentValue && paymentID.currentValue) {
            this.refundsService.search({ invoiceID: invoiceID.currentValue, paymentID: paymentID.currentValue });
        }
    }

    fetchMore() {
        this.refundsService.fetchMore();
    }
}
