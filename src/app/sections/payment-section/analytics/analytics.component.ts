import { Component } from '@angular/core';

import { AnalyticsService } from './analytics.service';

@Component({
    templateUrl: 'analytics.component.html',
    providers: [AnalyticsService]
})
export class AnalyticsComponent {
    distributionSearchParams$ = this.analyticsService.distributionSearchParams$;
    statSearchParams$ = this.analyticsService.statSearchParams$;
    searchParamsWithSplitUnit$ = this.analyticsService.searchParamsWithSplitUnit$;

    constructor(private analyticsService: AnalyticsService) {}
}
