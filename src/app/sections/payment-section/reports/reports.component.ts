import { Component } from '@angular/core';
import { shareReplay, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { ReportsService } from './reports.service';
import { booleanDebounceTime } from '../../../custom-operators';
import { mapToTimestamp } from '../operations/operators';
import { CreateReportDialogComponent } from './create-report-dialog';

@Component({
    selector: 'dsh-reports',
    templateUrl: 'reports.component.html',
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

    constructor(private reportsService: ReportsService, private dialog: MatDialog) {}

    create() {
        return this.dialog
            .open(CreateReportDialogComponent, {
                width: '560px'
            })
            .afterClosed()
            .pipe(filter(r => r === 'create'))
            .subscribe(() => {
                this.refresh();
            });
    }
}
