import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { SearchParams } from '../search-params';
import { PaymentsErrorDistributionService } from './payments-error-distribution.service';

@Component({
    selector: 'dsh-payments-error-distribution',
    templateUrl: './payments-error-distribution.component.html',
    providers: [PaymentsErrorDistributionService],
})
export class PaymentsErrorDistributionComponent implements OnChanges {
    @Input() spinnerType: SpinnerType;

    @Input() searchParams: SearchParams;

    errorDistribution$ = this.distributionsService.errorDistribution$;
    isLoading$ = this.distributionsService.isLoading$;
    error$ = this.distributionsService.error$;

    constructor(private distributionsService: PaymentsErrorDistributionService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.searchParams.currentValue &&
            changes.searchParams.currentValue !== changes.searchParams.previousValue
        ) {
            this.distributionsService.updateSearchParams(this.searchParams);
        }
    }
}
