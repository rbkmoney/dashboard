import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { filter, first, switchMap, switchMapTo } from 'rxjs/operators';

import { QueryParamsService } from '@dsh/app/shared/services/query-params';

import { RealmMixinService, PaymentInstitutionRealmService } from '../services';
import { CreateReportDialogComponent } from './create-report/create-report-dialog.component';
import { FetchReportsService } from './fetch-reports.service';
import { ReportsExpandedIdManager } from './reports-expanded-id-manager.service';
import { Filters, SearchFiltersParams } from './reports-search-filters';

@UntilDestroy()
@Component({
    templateUrl: 'reports.component.html',
    providers: [FetchReportsService, ReportsExpandedIdManager, RealmMixinService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent implements OnInit {
    reports$ = this.fetchReportsService.searchResult$;
    isLoading$ = this.fetchReportsService.isLoading$;
    lastUpdated$ = this.fetchReportsService.lastUpdated$;
    expandedId$ = this.reportsExpandedIdManager.expandedId$;
    params$ = this.qp.params$;
    fetchErrors$ = this.fetchReportsService.errors$;
    hasMore$ = this.fetchReportsService.hasMore$;

    private createReport$ = new Subject();

    constructor(
        private fetchReportsService: FetchReportsService,
        private reportsExpandedIdManager: ReportsExpandedIdManager,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private qp: QueryParamsService<Filters>,
        private realmService: PaymentInstitutionRealmService,
        private dialog: MatDialog,
        private realmMixinService: RealmMixinService<SearchFiltersParams>
    ) {}

    ngOnInit(): void {
        this.fetchReportsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('errors.fetchError', null, 'reports'), 'OK')
        );
        this.realmMixinService.valueAndRealm$
            .pipe(untilDestroyed(this))
            .subscribe((v) => this.fetchReportsService.search(v));
        this.createReport$
            .pipe(
                switchMapTo(this.realmService.realm$.pipe(first())),
                switchMap((realm) =>
                    this.dialog
                        .open(CreateReportDialogComponent, { data: { realm } })
                        .afterClosed()
                        .pipe(filter((r) => r === 'created'))
                ),
                untilDestroyed(this)
            )
            .subscribe(() => {
                this.snackBar.open(
                    this.transloco.translate('createReport.successfullyCreated', null, 'reports'),
                    'OK',
                    { duration: 2000 }
                );
                this.refresh();
            });
    }

    searchParamsChanges(p: Filters): void {
        void this.qp.set(p);
        const { dateRange, ...params } = p;
        this.realmMixinService.valueChange({
            ...params,
            fromTime: dateRange.start.utc().format(),
            toTime: dateRange.end.utc().format(),
            realm: null,
        });
    }

    expandedIdChange(id: number): void {
        this.reportsExpandedIdManager.expandedIdChange(id);
    }

    refresh(): void {
        this.fetchReportsService.refresh();
    }

    create(): void {
        this.createReport$.next();
    }

    fetchMore(): void {
        this.fetchReportsService.fetchMore();
    }
}
