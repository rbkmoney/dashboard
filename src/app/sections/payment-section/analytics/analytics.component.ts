import { Component } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { AnalyticsService } from './analytics.service';

@Component({
    templateUrl: 'analytics.component.html',
    providers: [AnalyticsService]
})
export class AnalyticsComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    distributionSearchParams$ = this.analyticsService.distributionSearchParams$;
    statSearchParams$ = this.analyticsService.statSearchParams$;
    searchParamsWithSplitUnit$ = this.analyticsService.searchParamsWithSplitUnit$;

    constructor(private analyticsService: AnalyticsService) {}
}
