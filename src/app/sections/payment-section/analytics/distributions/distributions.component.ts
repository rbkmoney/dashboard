import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { SearchParams } from '../search-params';
import { DistributionsService } from './distributions.service';

@Component({
    selector: 'dsh-distributions',
    templateUrl: './distributions.component.html',
    providers: [DistributionsService]
})
export class DistributionsComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    paymentsToolDistribution$ = this.distributionsService.toolDistribution$;
    isPaymentsToolDistributionLoading$ = this.distributionsService.isToolDistributionLoading$;
    paymentsToolDistributionError$ = this.distributionsService.toolDistributionError$;

    paymentsErrorsDistribution$ = this.distributionsService.errorsDistribution$;
    isPaymentsErrorsDistributionLoading$ = this.distributionsService.isErrorsDistributionLoading$;
    paymentsErrorsDistributionError$ = this.distributionsService.errorsDistributionError$;

    constructor(private distributionsService: DistributionsService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.distributionsService.updateSearchParams(this.searchParams);
        }
    }
}
