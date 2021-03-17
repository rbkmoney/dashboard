import { Component, OnInit } from '@angular/core';

import { DepositsSearchParams } from '@dsh/api';

import { DepositsCachingService } from './services/deposits-caching.service';
import { DepositsExpandedIdManagerService } from './services/deposits-expanded-id-manager.service';
import { DepositsService } from './services/deposits.service';
import { FetchDepositsService } from './services/fetch-deposits.service';

@Component({
    templateUrl: 'deposits.component.html',
    styleUrls: ['deposits.component.scss'],
    providers: [DepositsService, DepositsCachingService, FetchDepositsService, DepositsExpandedIdManagerService],
})
export class DepositsComponent implements OnInit {
    deposits$ = this.depositsService.list$;
    hasMore$ = this.depositsService.hasMore$;
    lastUpdated$ = this.depositsService.lastUpdated$;
    isLoading$ = this.depositsService.isLoading$;
    expandedId$ = this.depositsExpandedIdManagerService.expandedId$;

    constructor(
        private depositsService: DepositsService,
        private depositsExpandedIdManagerService: DepositsExpandedIdManagerService
    ) {}

    refreshList(): void {
        this.depositsService.refresh();
    }

    requestNextPage(): void {
        this.depositsService.loadMore();
    }

    filtersChanged(filtersData: DepositsSearchParams): void {
        this.requestList(filtersData);
    }

    ngOnInit(): void {
        this.depositsService.search(null);
    }

    expandedIdChange(id: number): void {
        this.depositsExpandedIdManagerService.expandedIdChange(id);
    }

    private requestList(filtersData: DepositsSearchParams = null): void {
        this.depositsService.search(filtersData);
    }
}
