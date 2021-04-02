import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { SpinnerType } from '@dsh/components/indicators';

import { LAYOUT_GAP } from '../tokens';
import { ClaimsSearchFiltersStore } from './claims-search-filters-store.service';
import { ClaimsSearchFiltersSearchParams } from './claims-search-filters/claims-search-filters-search-params';
import { FetchClaimsService } from './services/fetch-claims/fetch-claims.service';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss'],
    providers: [FetchClaimsService, ClaimsSearchFiltersStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsComponent {
    claimsList$ = this.fetchClaimsService.searchResult$;
    isLoading$ = this.fetchClaimsService.isLoading$;
    lastUpdated$ = this.fetchClaimsService.lastUpdated$;
    hasMore$ = this.fetchClaimsService.hasMore$;
    initSearchParams$ = this.claimsSearchFiltersStore.data$.pipe(take(1));

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private claimsSearchFiltersStore: ClaimsSearchFiltersStore,
        private fetchClaimsService: FetchClaimsService,
        private router: Router
    ) {}

    search(val: ClaimsSearchFiltersSearchParams) {
        this.claimsSearchFiltersStore.preserve(val);
        this.fetchClaimsService.search(val);
    }

    fetchMore() {
        this.fetchClaimsService.fetchMore();
    }

    refresh() {
        this.fetchClaimsService.refresh();
    }

    goToClaimDetails(id: number) {
        this.router.navigate(['claim', id]);
    }
}
