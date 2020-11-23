import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { donutChartColors } from '../../../../../styles/chart-colors';
import { SearchParams } from '../search-params';
import { PaymentsErrorDistributionService } from './payments-error-distribution.service';

@Component({
    selector: 'dsh-payments-error-distribution',
    templateUrl: 'payments-error-distribution.component.html',
    providers: [PaymentsErrorDistributionService],
    encapsulation: ViewEncapsulation.Emulated,
})
export class PaymentsErrorDistributionComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    errorDistribution$ = this.distributionsService.chartData$;
    isLoading$ = this.distributionsService.isLoading$;
    error$ = this.distributionsService.error$;

    currentErrorTitle$ = this.distributionsService.currentErrorTitle$;

    colors = donutChartColors;

    constructor(private distributionsService: PaymentsErrorDistributionService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.distributionsService.updateSearchParams(this.searchParams);
        }
    }

    updateDataSelection(value: number) {
        this.distributionsService.updateDataSelection(value);
    }

    goBackDataSelection() {
        this.distributionsService.goBackDataSelection();
    }
}
