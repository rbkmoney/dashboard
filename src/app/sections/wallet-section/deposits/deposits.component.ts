import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

import { booleanDebounceTime, SHARE_REPLAY_CONF } from '@dsh/operators';

import { DepositsExpandedIdManagerService } from './deposit-panels/services/deposits-expanded-id-manager.service';
import { FetchDepositsService } from './services/fetch-deposits.service';

@Component({
    templateUrl: 'deposits.component.html',
    styleUrls: ['deposits.component.scss'],
    providers: [FetchDepositsService, DepositsExpandedIdManagerService],
})
export class DepositsComponent implements OnInit {
    deposits$ = this.fetchDepositsService.depositsList$;
    hasMore$ = this.fetchDepositsService.hasMore$;
    doAction$ = this.fetchDepositsService.doAction$;
    lastUpdated$ = this.fetchDepositsService.lastUpdated$;
    isLoading$ = this.doAction$.pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));
    expandedId$ = this.depositsExpandedIdManagerService.expandedId$;

    constructor(
        private fetchDepositsService: FetchDepositsService,
        private depositsExpandedIdManagerService: DepositsExpandedIdManagerService
    ) {}

    fetchMore() {
        this.fetchDepositsService.fetchMore();
    }

    ngOnInit(): void {
        this.fetchDepositsService.search(null);
    }

    expandedIdChange(id: number): void {
        this.depositsExpandedIdManagerService.expandedIdChange(id);
    }
}
