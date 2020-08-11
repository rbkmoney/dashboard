import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { filter, shareReplay } from 'rxjs/operators';

import { Report } from '../../../api-codegen/anapi';
import { booleanDebounceTime } from '../../../custom-operators';
import { mapToTimestamp } from '../operations/operators';
import { CreateReportDialogComponent } from './create-report-dialog';
import { ExpandedIdManager } from './expanded-id-manager.service';
import { ReportsService } from './reports.service';

@Component({
    selector: 'dsh-reports',
    templateUrl: 'reports.component.html',
    styleUrls: ['reports.component.scss'],
    providers: [ReportsService, ExpandedIdManager],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
    reports$ = this.reportsService.searchResult$;
    isLoading$ = this.reportsService.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$ = this.reportsService.searchResult$.pipe(mapToTimestamp, shareReplay(1));
    expandedId$ = this.expandedIdManager.expandedId$;

    constructor(
        private reportsService: ReportsService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private expandedIdManager: ExpandedIdManager<Report>
    ) {
        this.expandedIdManager.data$ = this.reports$;
    }

    expandedIdChange(id: number) {
        this.expandedIdManager.expandedIdChange(id);
    }

    fetchMore() {
        this.reportsService.fetchMore();
    }

    refresh() {
        this.reportsService.refresh();
    }

    create() {
        return this.dialog
            .open(CreateReportDialogComponent, {
                width: '560px',
                disableClose: true,
                data: {
                    shopsInfo$: this.reportsService.shopsInfo$,
                },
            })
            .afterClosed()
            .pipe(filter((r) => r === 'create'))
            .subscribe(() => {
                this.snackBar.open(
                    this.transloco.translate('create.success', null, 'reports|scoped'),
                    this.transloco.translate('ok')
                );
                this.refresh();
            });
    }
}
