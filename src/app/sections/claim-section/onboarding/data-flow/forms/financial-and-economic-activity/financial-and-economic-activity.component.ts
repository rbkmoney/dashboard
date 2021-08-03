import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';

import { FinancialAndEconomicActivityService } from './financial-and-economic-activity.service';

@Component({
    templateUrl: 'financial-and-economic-activity.component.html',
})
export class FinancialAndEconomicActivityComponent implements OnInit, OnDestroy {
    form$ = this.activityService.form$;

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    accountantOptionTypes = this.activityService.accountantOptionTypes;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isAccountantInfoVisible$ = this.activityService.isAccountantInfoVisible$;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isAccountantOrgInnVisible$ = this.activityService.isAccountantOrgInnVisible$;
    // eslint-disable-next-line @typescript-eslint/member-ordering
    isResidencyInfoVisible$ = this.activityService.isResidencyInfoVisible$;

    constructor(private activityService: FinancialAndEconomicActivityService) {}

    withoutAccountantChange({ checked }: MatCheckboxChange) {
        this.activityService.withoutAccountantChange(checked);
    }

    accountantTypeSelectionChange({ value }: MatSelectChange) {
        this.activityService.accountantTypeChange(value);
    }

    ngOnInit() {
        this.valuePersistentSub = this.activityService.startFormValuePersistent();
    }

    ngOnDestroy() {
        this.valuePersistentSub.unsubscribe();
    }
}
