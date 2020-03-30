import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SearchParams } from '../search-params';
import { DistributionsService } from './distributions.service';

@Component({
    selector: 'dsh-distributions',
    templateUrl: './distributions.component.html',
    providers: [DistributionsService]
})
export class DistributionsComponent implements OnChanges {
    @Input() searchParams: SearchParams;

    paymentsToolDistribution$ = this.distributionsService.paymentsToolDistribution$;
    isPaymentsToolDistributionLoading$ = this.distributionsService.isPaymentsToolDistributionLoading$;
    paymentsToolDistributionError$ = this.distributionsService.paymentsToolDistributionError$;

    paymentsErrorsDistribution$ = this.distributionsService.paymentsErrorsDistribution$;
    isPaymentsErrorsDistributionLoading$ = this.distributionsService.isPaymentsErrorsDistributionLoading$;
    paymentsErrorsDistributionError$ = this.distributionsService.paymentsErrorsDistributionError$;

    constructor(private distributionsService: DistributionsService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.searchParams.currentValue !== changes.searchParams.previousValue) {
            this.distributionsService.updateSearchParams(this.searchParams);
        }
    }
}
