import { Component, OnInit } from '@angular/core';

import { booleanDebounceTime, publishReplayRefCount } from '@dsh/operators';

import { FetchWithdrawalsService } from './services/fetch-withdrawals/fetch-withdrawals.service';
import { WithdrawalsExpandedIdManager } from './withdrawals-expanded-id-manager.service';

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
        private withdrawalsExpandedIdManager: WithdrawalsExpandedIdManager
    ) {}

    ngOnInit(): void {
        this.fetchWithdrawalsService.search(null);
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
