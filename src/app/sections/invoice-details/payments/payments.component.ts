import { Component, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';

import { PaymentsService } from './payments.service';
import { PaymentSearchFormValue } from '../../payment-section/operations/payments/search-form';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [PaymentsService],
    styleUrls: ['payments.component.scss']
})
export class PaymentsComponent implements OnChanges {
    payments$ = this.paymentsService.searchResult$;
    hasMore$ = this.paymentsService.hasMore$;

    @Input()
    invoiceID: string;

    @Input()
    shopID: string;

    constructor(private paymentsService: PaymentsService, @Inject(LAYOUT_GAP) public layoutGap: string) {}

    fetchMore() {
        this.paymentsService.fetchMore();
    }

    ngOnChanges({ invoiceID, shopID }: SimpleChanges): void {
        if (invoiceID.currentValue && shopID.currentValue) {
            this.search(invoiceID.currentValue, shopID.currentValue);
        }
    }

    private search(invoiceID, shopID) {
        this.paymentsService.search({
            invoiceID,
            shopID
        } as PaymentSearchFormValue);
    }
}
