import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BankContent } from '../../../../../api-codegen/aggr-proxy';
import { PlanningOperationsAndPayoutToolService } from './planning-operations-and-payout-tool.service';

@Component({
    templateUrl: 'planning-operations-and-payout-tool.component.html',
    styleUrls: ['planning-operations-and-payout-tool.component.scss'],
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
