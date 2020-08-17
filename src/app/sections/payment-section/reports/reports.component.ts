import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { filter, pluck, take } from 'rxjs/operators';

import { ShopService } from '../../../api';
import { filterShopsByEnv, mapToShopInfo } from '../operations/operators';
import { CreateReportDialogComponent } from './create-report-dialog';
import { FetchReportsService } from './fetch-reports.service';
import { PayoutsExpandedIdManager } from './payouts-expanded-id-manager.service';
import { SearchFiltersParams } from './reports-search-filters';
import { ReportsSearchFiltersStore } from './reports-search-filters-store.service';

@Component({
    selector: 'dsh-reports',
    templateUrl: 'reports.component.html',
    styleUrls: ['reports.component.scss'],
    providers: [FetchReportsService, ReportsSearchFiltersStore, PayoutsExpandedIdManager],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent implements OnInit {
    reports$ = this.fetchReportsService.searchResult$;
    isLoading$ = this.fetchReportsService.isLoading$;
    lastUpdated$ = this.fetchReportsService.lastUpdated$;
    expandedId$ = this.payoutsExpandedIdManager.expandedId$;
    initSearchParams$ = this.reportsSearchFiltersStore.data$.pipe(take(1));
    fetchErrors$ = this.fetchReportsService.errors$;

    private shopsInfo$ = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo
    );

    constructor(
        private fetchReportsService: FetchReportsService,
        private payoutsExpandedIdManager: PayoutsExpandedIdManager,
        private reportsSearchFiltersStore: ReportsSearchFiltersStore,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private shopService: ShopService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.fetchReportsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('errors.fetchError', null, 'reports|scoped'), 'OK')
        );
    }

    searchParamsChanges(p: SearchFiltersParams) {
        this.fetchReportsService.search(p);
        this.reportsSearchFiltersStore.preserve(p);
    }

    expandedIdChange(id: number) {
        this.payoutsExpandedIdManager.expandedIdChange(id);
    }

    refresh() {
        this.fetchReportsService.refresh();
    }

    create() {
        return this.dialog
            .open(CreateReportDialogComponent, {
                width: '560px',
                disableClose: true,
                data: {
                    shopsInfo$: this.shopsInfo$,
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
