import { Component, Inject } from '@angular/core';
import { take } from 'rxjs/operators';

import { SpinnerType } from '@dsh/components/indicators';

import { LAYOUT_GAP } from '../constants';
import { ClaimsSearchFiltersStore } from './claims-search-filters-store.service';
import { ClaimsSearchFiltersSearchParams } from './claims-search-filters/claims-search-filters-search-params';
import { ClaimsService } from './claims.service';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss'],
    providers: [ClaimsService, ClaimsSearchFiltersStore],
})
export class ClaimsComponent {
    tableData$ = this.claimsService.claimsTableData$;
    isLoading$ = this.claimsService.isLoading$;
    lastUpdated$ = this.claimsService.lastUpdated$;
    hasMore$ = this.claimsService.hasMore$;
    initSearchParams$ = this.claimsSearchFiltersStore.data$.pipe(take(1));

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private claimsService: ClaimsService,
        private claimsSearchFiltersStore: ClaimsSearchFiltersStore
    ) {}

    search(val: ClaimsSearchFiltersSearchParams) {
        this.claimsService.search(val);
    }

    fetchMore() {
        this.claimsService.fetchMore();
    }

    refresh() {
        this.claimsService.refresh();
    }
}
