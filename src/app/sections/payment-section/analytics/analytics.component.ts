import { Component } from '@angular/core';

import { AnalyticsService } from './analytics.service';
import { SearchParams } from './search-params';

@Component({
    templateUrl: 'analytics.component.html',
    providers: [AnalyticsService]
})
export class AnalyticsComponent {
    paymentsSplitCount$ = this.analyticsService.paymentsSplitCount$;
    paymentsSplitAmount$ = this.analyticsService.paymentsSplitAmount$;

    constructor(private analyticsService: AnalyticsService) {}

    formValueChanges(formValue: SearchParams) {
        this.analyticsService.formValueChanges(formValue);
    }
}
