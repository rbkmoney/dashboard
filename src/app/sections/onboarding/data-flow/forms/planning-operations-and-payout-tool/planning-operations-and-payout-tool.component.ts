import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PlanningOperationsAndPayoutToolService } from './planning-operations-and-payout-tool.service';
import { BankContent } from '../../../../../api-codegen/aggr-proxy';

@Component({
    templateUrl: 'planning-operations-and-payout-tool.component.html',
    styleUrls: ['planning-operations-and-payout-tool.component.scss']
})
export class PlanningOperationsAndPayoutToolComponent implements OnInit, OnDestroy {
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

    bankSelected({ bic, correspondentAccount }: BankContent) {
        this.payoutToolService.patchBankAccountForm({ bankBik: bic, bankPostAccount: correspondentAccount });
    }
}
