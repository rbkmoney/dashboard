import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';

import { FinancialAndEconomicActivityService } from './financial-and-economic-activity.service';

@Component({
    templateUrl: 'financial-and-economic-activity.component.html'
})
export class FinancialAndEconomicActivityComponent implements OnInit, OnDestroy {
    layoutGap = '20px';

    form$ = this.activityService.form$;

    private valuePersistentSub: Subscription = Subscription.EMPTY;

    constructor(private activityService: FinancialAndEconomicActivityService) {}

    accountantOptionTypes = this.activityService.accountantOptionTypes;
    isAccountantInfoVisible$ = this.activityService.isAccountantInfoVisible$;
    isAccountantOrgInnVisible$ = this.activityService.isAccountantOrgInnVisible$;
    isResidencyInfoVisible$ = this.activityService.isResidencyInfoVisible$;

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
