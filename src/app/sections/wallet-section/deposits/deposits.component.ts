import { Component, OnInit } from '@angular/core';
import { untilDestroyed } from '@ngneat/until-destroy';

import { DepositsSearchParams } from '@dsh/api';
import { ErrorService } from '@dsh/app/shared';

import { DepositsExpandedIdManagerService } from './services/deposits-expanded-id-manager.service';
import { FetchDepositsService } from './services/fetch-deposits.service';

@Component({
    templateUrl: 'deposits.component.html',
    styleUrls: ['deposits.component.scss'],
    providers: [FetchDepositsService, DepositsExpandedIdManagerService],
})
export class DepositsComponent implements OnInit {
    deposits$ = this.fetchDepositsService.searchResult$;
    hasMore$ = this.fetchDepositsService.hasMore$;
    lastUpdated$ = this.fetchDepositsService.lastUpdated$;
    isLoading$ = this.fetchDepositsService.isLoading$;
    expandedId$ = this.depositsExpandedIdManagerService.expandedId$;

    constructor(
        private fetchDepositsService: FetchDepositsService,
        private depositsExpandedIdManagerService: DepositsExpandedIdManagerService,
        private errorsService: ErrorService
    ) {
        this.fetchDepositsService.errors$.pipe(untilDestroyed(this)).subscribe((error: Error) => {
            this.errorsService.error(error);
        });
    }

    refreshList(): void {
        this.fetchDepositsService.refresh();
    }

    requestNextPage(): void {
        this.fetchDepositsService.fetchMore();
    }

    filtersChanged(filtersData: DepositsSearchParams): void {
        this.requestList(filtersData);
    }

    ngOnInit(): void {
        this.fetchDepositsService.search(null);
    }

    expandedIdChange(id: number): void {
        this.depositsExpandedIdManagerService.expandedIdChange(id);
    }

    private requestList(filtersData: DepositsSearchParams = null): void {
        this.fetchDepositsService.search(filtersData);
    }
}
