import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ErrorService } from '@dsh/app/shared';
import { QueryParamsService } from '@dsh/app/shared/services/query-params';

import { DepositsFilters } from './deposits-filters/types/deposits-filters';
import { DepositsExpandedIdManagerService } from './services/deposits-expanded-id-manager/deposits-expanded-id-manager.service';
import { FetchDepositsService } from './services/fetch-deposits/fetch-deposits.service';
import { filtersToSearchParams } from './utils/filters-to-search-params';

@UntilDestroy()
@Component({
    templateUrl: 'deposits.component.html',
    styleUrls: ['deposits.component.scss'],
    providers: [FetchDepositsService, DepositsExpandedIdManagerService],
})
export class DepositsComponent {
    deposits$ = this.fetchDepositsService.searchResult$;
    hasMore$ = this.fetchDepositsService.hasMore$;
    lastUpdated$ = this.fetchDepositsService.lastUpdated$;
    isLoading$ = this.fetchDepositsService.isLoading$;
    expandedId$ = this.depositsExpandedIdManagerService.expandedId$;
    initParams$ = this.qp.params$;

    constructor(
        private fetchDepositsService: FetchDepositsService,
        private depositsExpandedIdManagerService: DepositsExpandedIdManagerService,
        private errorsService: ErrorService,
        private qp: QueryParamsService<DepositsFilters>
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

    filtersChanged(filters: DepositsFilters): void {
        void this.qp.set(filters);
        this.fetchDepositsService.search(filtersToSearchParams(filters));
    }

    expandedIdChange(id: number): void {
        this.depositsExpandedIdManagerService.expandedIdChange(id);
    }
}
