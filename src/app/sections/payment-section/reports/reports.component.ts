import { Component } from '@angular/core';
import { shareReplay, filter } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

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

    constructor(
        private reportsService: ReportsService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    create() {
        return this.dialog
            .open(CreateReportDialogComponent, {
                width: '560px',
                data: {
                    shopsInfo$: this.reportsService.shopsInfo$
                }
            })
            .afterClosed()
            .pipe(filter(r => r === 'create'))
            .subscribe(() => {
                this.snackBar.open(
                    this.transloco.translate('create.success', null, 'reports|scoped'),
                    this.transloco.translate('ok')
                );
                this.refresh();
            });
    }
}
