import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { pluck, take } from 'rxjs/operators';

import { CreateReportService } from './create-report';
import { FetchReportsService } from './fetch-reports.service';
import { ReportsExpandedIdManager } from './reports-expanded-id-manager.service';
import { SearchFiltersParams } from './reports-search-filters';
import { ReportsSearchFiltersStore } from './reports-search-filters-store.service';

@Component({
    templateUrl: 'reports.component.html',
    styleUrls: ['reports.component.scss'],
    providers: [FetchReportsService, ReportsSearchFiltersStore, ReportsExpandedIdManager],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent implements OnInit, OnDestroy {
    reports$ = this.fetchReportsService.searchResult$;
    isLoading$ = this.fetchReportsService.isLoading$;
    lastUpdated$ = this.fetchReportsService.lastUpdated$;
    expandedId$ = this.reportsExpandedIdManager.expandedId$;
    initSearchParams$ = this.reportsSearchFiltersStore.data$.pipe(take(1));
    fetchErrors$ = this.fetchReportsService.errors$;

    constructor(
        private fetchReportsService: FetchReportsService,
        private reportsExpandedIdManager: ReportsExpandedIdManager,
        private reportsSearchFiltersStore: ReportsSearchFiltersStore,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private route: ActivatedRoute,
        private createReportService: CreateReportService
    ) {}

    ngOnInit() {
        this.route.params.pipe(pluck('envID')).subscribe((envID) => this.createReportService.init(envID));
        this.createReportService.reportCreated$.subscribe(() => {
            this.snackBar.open(
                this.transloco.translate('createReport.successfullyCreated', null, 'reports|scoped'),
                'OK',
                { duration: 2000 }
            );
            this.refresh();
        });
        this.fetchReportsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('errors.fetchError', null, 'reports|scoped'), 'OK')
        );
    }

    ngOnDestroy() {
        this.createReportService.destroy();
    }

    searchParamsChanges(p: SearchFiltersParams) {
        this.fetchReportsService.search(p);
        this.reportsSearchFiltersStore.preserve(p);
    }

    expandedIdChange(id: number) {
        this.reportsExpandedIdManager.expandedIdChange(id);
    }

    refresh() {
        this.fetchReportsService.refresh();
    }

    create() {
        this.createReportService.createReport();
    }
}
