import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { PlanningOperationsAndPayoutToolService } from './planning-operations-and-payout-tool.service';

@Component({
    templateUrl: 'planning-operations-and-payout-tool.component.html',
    styleUrls: ['planning-operations-and-payout-tool.component.scss']
})
export class PlanningOperationsAndPayoutToolComponent {
    layoutGap = '20px';

    form$ = this.payoutToolService.form$;

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    constructor(private payoutToolService: PlanningOperationsAndPayoutToolService) {}

    monthOperationCounts = this.payoutToolService.monthOperationCounts;
    monthOperationSums = this.payoutToolService.monthOperationSums;

    ngOnInit() {
        this.valuePersistentSub = this.payoutToolService.startFormValuePersistent();
    }

    ngOnDestroy() {
        this.valuePersistentSub.unsubscribe();
    }
}
