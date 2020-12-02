import { Component, Inject } from '@angular/core';
import { take } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { SpinnerType } from '@dsh/components/indicators';

import { LAYOUT_GAP } from '../constants';
import { ClaimsSearchFiltersStore } from './claims-search-filters-store.service';
import { ClaimsSearchFiltersSearchParams } from './claims-search-filters/claims-search-filters-search-params';
import { ClaimsService } from './claims.service';
import { ClaimSearchFormValue } from './search-form';
import { ClaimsExpandedIdManagerService } from './services/claims-expanded-id-manager/claims-expanded-id-manager.service';
import { FetchClaimsService } from './services/fetch-claims/fetch-claims.service';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss'],
    providers: [ClaimsService, ClaimsSearchFiltersStore],
    providers: [FetchClaimsService, ClaimsExpandedIdManagerService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsComponent {
    claimsList$ = this.fetchClaimsService.searchResult$;
    isLoading$ = this.fetchClaimsService.isLoading$;
    lastUpdated$ = this.fetchClaimsService.lastUpdated$;
    hasMore$ = this.fetchClaimsService.hasMore$;
    expandedId$ = this.claimsExpandedIdManagerService.expandedId$;
    tableData$ = this.claimsService.claimsTableData$;
    isLoading$ = this.claimsService.isLoading$;
    lastUpdated$ = this.claimsService.lastUpdated$;
    hasMore$ = this.claimsService.hasMore$;
    initSearchParams$ = this.claimsSearchFiltersStore.data$.pipe(take(1));

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private claimsSearchFiltersStore: ClaimsSearchFiltersStore
        private fetchClaimsService: FetchClaimsService,
        private claimsExpandedIdManagerService: ClaimsExpandedIdManagerService,
        private router: Router
    ) {}

    search(val: ClaimsSearchFiltersSearchParams) {
        this.claimsService.search(val);
    }

    fetchMore() {
        this.fetchClaimsService.fetchMore();
    }

    refresh() {
        this.fetchClaimsService.refresh();
    }

    expandedIdChange(id: number) {
        this.claimsExpandedIdManagerService.expandedIdChange(id);
    }

    goToClaimDetails(id: number) {
        this.router.navigate(['claim', id]);
    }
}
