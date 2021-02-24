import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { PaymentSearchFormValue } from '../../payment-section/operations/payments';
import { LAYOUT_GAP } from '../../tokens';
import { PaymentsService } from './payments.service';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [PaymentsService],
    styleUrls: ['payments.component.scss'],
})
export class PaymentsComponent implements OnChanges {
    payments$ = this.paymentsService.searchResult$;
    hasMore$ = this.paymentsService.hasMore$;
    isLoading$ = this.paymentsService.isLoading$;

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    @Input()
    invoiceID: string;

    constructor(private paymentsService: PaymentsService, @Inject(LAYOUT_GAP) public layoutGap: string) {}

    fetchMore() {
        this.paymentsService.fetchMore();
    }

    ngOnChanges({ invoiceID }: SimpleChanges): void {
        if (invoiceID.currentValue) {
            this.search(invoiceID.currentValue);
        }
    }

    private search(invoiceID) {
        this.paymentsService.search({
            invoiceID,
        } as PaymentSearchFormValue);
    }
}
