import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { QueryParamsService } from '@dsh/app/shared/services/query-params';
import { booleanDebounceTime, publishReplayRefCount } from '@dsh/operators';

import { FetchWithdrawalsService } from './services/fetch-withdrawals/fetch-withdrawals.service';
import { WithdrawalsExpandedIdManager } from './services/withdrawals-expanded-id-manager/withdrawals-expanded-id-manager.service';
import { filtersToSearchParams } from './utils/filters-to-search-params';
import { WithdrawalsFilters } from './withdrawals-filters/types/withdrawals-filters';

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
        private qp: QueryParamsService<WithdrawalsFilters>
    ) {}

    ngOnInit(): void {
        this.fetchWithdrawalsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('fetchError', null, 'withdrawals'), 'OK')
        );
    }

    filtersChanged(filters: WithdrawalsFilters): void {
        void this.qp.set(filters);
        this.fetchWithdrawalsService.search(filtersToSearchParams(filters));
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
