import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { booleanDebounceTime, publishReplayRefCount } from '@dsh/operators';

import { FetchWithdrawalsService } from './services/fetch-withdrawals/fetch-withdrawals.service';
import { WithdrawalsExpandedIdManager } from './services/withdrawals-expanded-id-manager/withdrawals-expanded-id-manager.service';

@Component({
    templateUrl: 'withdrawals.component.html',
    providers: [WithdrawalsExpandedIdManager],
    styleUrls: ['withdrawals.component.scss'],
})
export class WithdrawalsComponent implements OnInit {
    withdrawals$ = this.fetchWithdrawalsService.searchResult$;
    hasMore$ = this.fetchWithdrawalsService.hasMore$;
    doAction$ = this.fetchWithdrawalsService.doAction$;
    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), publishReplayRefCount());
    lastUpdated$ = this.fetchWithdrawalsService.lastUpdated$;
    expandedId$ = this.withdrawalsExpandedIdManager.expandedId$;

    constructor(
        private fetchWithdrawalsService: FetchWithdrawalsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private withdrawalsExpandedIdManager: WithdrawalsExpandedIdManager
    ) {}

    ngOnInit(): void {
        // TODO: remove it with filters refactoring
        this.fetchWithdrawalsService.search(null);
        this.fetchWithdrawalsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('fetchError', null, 'withdrawals'), 'OK')
        );
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
