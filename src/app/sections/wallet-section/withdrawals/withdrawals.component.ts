import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { WithdrawalsSearchParams } from '@dsh/api';
import { QueryParamsService } from '@dsh/app/shared/services/query-params';
import { booleanDebounceTime, publishReplayRefCount } from '@dsh/operators';

import { FetchWithdrawalsService, WithdrawalsExpandedIdManager } from './services';
import { WithdrawalsFilters } from './withdrawals-filters';

@Component({
    templateUrl: 'withdrawals.component.html',
    providers: [FetchWithdrawalsService, WithdrawalsExpandedIdManager],
})
export class WithdrawalsComponent implements OnInit {
    withdrawals$ = this.fetchWithdrawalsService.searchResult$;
    hasMore$ = this.fetchWithdrawalsService.hasMore$;
    doAction$ = this.fetchWithdrawalsService.doAction$;
    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), publishReplayRefCount());
    lastUpdated$ = this.fetchWithdrawalsService.lastUpdated$;
    expandedId$ = this.withdrawalsExpandedIdManager.expandedId$;
    initParams$ = this.qp.params$;

    constructor(
        private fetchWithdrawalsService: FetchWithdrawalsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private withdrawalsExpandedIdManager: WithdrawalsExpandedIdManager,
        private qp: QueryParamsService<WithdrawalsSearchParams>
    ) {}

    ngOnInit(): void {
        this.fetchWithdrawalsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('fetchError', null, 'withdrawals'), 'OK')
        );
    }

    filtersChanged(filters: WithdrawalsFilters): void {
        void this.qp.set(filters);
        this.fetchWithdrawalsService.search({
            ...filters,
            fromTime: filters.dateRange.start.utc().format(),
            toTime: filters.dateRange.end.utc().format(),
        });
    }

    expandedIdChange(id: number): void {
        this.withdrawalsExpandedIdManager.expandedIdChange(id);
    }

    fetchMore(): void {
        this.fetchWithdrawalsService.fetchMore();
    }

    refresh(): void {
        this.fetchWithdrawalsService.refresh();
    }
}
