import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BankContent } from '@dsh/api-codegen/aggr-proxy';

import { PlanningOperationsAndPayoutToolService } from './planning-operations-and-payout-tool.service';

@Component({
    templateUrl: 'planning-operations-and-payout-tool.component.html',
    styleUrls: ['planning-operations-and-payout-tool.component.scss'],
})
export class PlanningOperationsAndPayoutToolComponent implements OnInit, OnDestroy {
    form$ = this.payoutToolService.form$;

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    monthOperationCounts = this.payoutToolService.monthOperationCounts;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    monthOperationSums = this.payoutToolService.monthOperationSums;

    constructor(private payoutToolService: PlanningOperationsAndPayoutToolService) {}

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
