import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { stackedBarChartColors } from '../../../../../styles/chart-colors';
import { SearchParams } from '../search-params';
import { PaymentSplitCountService } from './payment-split-count.service';

@Component({
    selector: 'dsh-payment-split-count',
    templateUrl: './payment-split-count.component.html',
    providers: [PaymentSplitCountService],
})
export class PaymentSplitCountComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    splitCount$ = this.statsBarsService.splitCount$;
    isLoading$ = this.statsBarsService.isLoading$;
    error$ = this.statsBarsService.error$;

    colors = stackedBarChartColors;

    constructor(private statsBarsService: PaymentSplitCountService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.statsBarsService.updateSearchParams(this.searchParams);
        }
    }
}
