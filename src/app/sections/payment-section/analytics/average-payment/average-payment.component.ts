import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { SearchParams } from '../search-params';
import { AveragePaymentService } from './average-payment.service';

@Component({
    selector: 'dsh-average-payment',
    templateUrl: './average-payment.component.html',
    providers: [AveragePaymentService],
})
export class AveragePaymentComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    averagePayment$ = this.averagePaymentService.averagePayment$;
    isLoading$ = this.averagePaymentService.isLoading$;
    error$ = this.averagePaymentService.error$;

    constructor(private averagePaymentService: AveragePaymentService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.averagePaymentService.updateSearchParams(this.searchParams);
        }
    }
}
