import { Component } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { ReportsService } from './reports.service';
import { booleanDebounceTime } from '../../../custom-operators';
import { mapToTimestamp } from '../operations/operators';

@Component({
    selector: 'dsh-reports',
    templateUrl: 'reports.component.html',
    styleUrls: ['reports.component.scss'],
    providers: [ReportsService]
})
export class ReportsComponent {
    reports$ = this.reportsService.searchResult$;
    isLoading$ = this.reportsService.doAction$.pipe(
        booleanDebounceTime(500),
        shareReplay(1)
    );
    hasMore$ = this.reportsService.hasMore$;
    lastUpdated$ = this.reportsService.searchResult$.pipe(
        mapToTimestamp,
        shareReplay(1)
    );

    fetchMore = () => this.reportsService.fetchMore();
    refresh = () => this.reportsService.refresh();

    constructor(private reportsService: ReportsService) {}
}
