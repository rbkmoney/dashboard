import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { shareReplay } from 'rxjs/operators';

import { ErrorService } from '@dsh/app/shared';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';

import { DepositsFiltersData } from './deposits-filters/types/deposits-filters-data';
import { DepositsExpandedIdManagerService } from './services/deposits-expanded-id-manager.service';
import { FetchDepositsService } from './services/fetch-deposits.service';

@UntilDestroy()
@Component({
    templateUrl: 'deposits.component.html',
    styleUrls: ['deposits.component.scss'],
    providers: [FetchDepositsService, DepositsExpandedIdManagerService],
})
export class DepositsComponent implements OnInit {
    deposits$ = this.fetchDepositsService.searchResult$;
    hasMore$ = this.fetchDepositsService.hasMore$;
    lastUpdated$ = this.fetchDepositsService.searchResult$.pipe(mapToTimestamp, shareReplay(1));
    isLoading$ = this.fetchDepositsService.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
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

    filtersChanged(filtersData: DepositsFiltersData): void {
        this.requestList(filtersData);
    }

    ngOnInit(): void {
        this.fetchDepositsService.search(null);
    }

    expandedIdChange(id: number): void {
        this.depositsExpandedIdManagerService.expandedIdChange(id);
    }

    private requestList(filtersData: DepositsFiltersData = null): void {
        const {
            daterange: { begin, end },
            additional,
        } = filtersData;
        const { depositAmountTo, depositAmountFrom, depositID, walletID, identityID, sourceID, depositStatus } =
            additional || {};
        this.fetchDepositsService.search({
            fromTime: begin.utc().format(),
            toTime: end.utc().format(),
            walletID,
            identityID,
            sourceID,
            depositID,
            status: depositStatus,
            amountFrom: depositAmountFrom,
            amountTo: depositAmountTo,
        });
    }
}
