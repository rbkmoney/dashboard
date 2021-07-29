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
    monthOperationCounts = this.payoutToolService.monthOperationCounts;
    monthOperationSums = this.payoutToolService.monthOperationSums;

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    constructor(private payoutToolService: PlanningOperationsAndPayoutToolService) {}

    ngOnInit(): void {
        this.valuePersistentSub = this.payoutToolService.startFormValuePersistent();
    }

    ngOnDestroy(): void {
        this.valuePersistentSub.unsubscribe();
    }

    bankSelected(bank: BankContent): void {
        if (bank)
            this.payoutToolService.patchBankAccountForm({
                bankBik: bank.bic,
                bankPostAccount: bank.correspondentAccount,
            });
    }
}
