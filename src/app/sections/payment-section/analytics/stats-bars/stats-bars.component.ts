import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { SearchParamsWithSplitUnit } from '../search-params-with-split-unit';
import { StatsBarsService } from './stats-bars.service';

@Component({
    selector: 'dsh-stats-bars',
    templateUrl: './stats-bars.component.html',
    providers: [StatsBarsService]
})
export class StatsBarsComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParamsWithSplitUnit;

    paymentsSplitCount$ = this.statsBarsService.paymentsSplitCount$;
    isPaymentsSplitCountLoading$ = this.statsBarsService.isPaymentsSplitCountLoading$;
    paymentsSplitCountError$ = this.statsBarsService.paymentsSplitCountError$;

    paymentsSplitAmount$ = this.statsBarsService.paymentsSplitAmount$;
    isPaymentsSplitAmountLoading$ = this.statsBarsService.isPaymentsSplitAmountLoading$;
    paymentsSplitAmountError$ = this.statsBarsService.paymentsSplitAmountError$;

    constructor(private statsBarsService: StatsBarsService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.searchParams.currentValue !== changes.searchParams.previousValue) {
            this.statsBarsService.searchParamsChanges(this.searchParams);
        }
    }
}
