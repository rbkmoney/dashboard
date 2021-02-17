import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { Theme, THEME } from '../../../../../styles/theme';
import { SearchParams } from '../search-params';
import { PaymentsToolDistributionService } from './payments-tool-distribution.service';

@Component({
    selector: 'dsh-payments-tool-distribution',
    templateUrl: 'payments-tool-distribution.component.html',
    providers: [PaymentsToolDistributionService],
})
export class PaymentsToolDistributionComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    toolDistribution$ = this.distributionsService.toolDistribution$;
    isLoading$ = this.distributionsService.isLoading$;
    error$ = this.distributionsService.error$;

    colors = this.theme.charts.donutChartColors;

    constructor(private distributionsService: PaymentsToolDistributionService, @Inject(THEME) private theme: Theme) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.distributionsService.updateSearchParams(this.searchParams);
        }
    }
}
