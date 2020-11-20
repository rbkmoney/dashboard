import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { SearchParams } from '../search-params';
import { PaymentsCountService } from './payments-count.service';

@Component({
    selector: 'dsh-payments-count',
    templateUrl: 'payments-count.component.html',
    providers: [PaymentsCountService],
})
export class PaymentsCountComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    paymentsCount$ = this.paymentsCountService.paymentsCount$;
    isLoading$ = this.paymentsCountService.isLoading$;
    error$ = this.paymentsCountService.error$;

    constructor(private paymentsCountService: PaymentsCountService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.paymentsCountService.updateSearchParams(this.searchParams);
        }
    }
}
