import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ShopCreationService } from '@dsh/app/shared/components/shop-creation';
import { SpinnerType } from '@dsh/components/indicators';

import { QueryParamsService } from '../../../shared/services/query-params';
import { Filters } from './claims-search-filters/claims-search-filters.component';
import { FetchClaimsService } from './services/fetch-claims/fetch-claims.service';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss'],
    providers: [FetchClaimsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsComponent {
    claimsList$ = this.fetchClaimsService.searchResult$;
    isLoading$ = this.fetchClaimsService.isLoading$;
    lastUpdated$ = this.fetchClaimsService.lastUpdated$;
    hasMore$ = this.fetchClaimsService.hasMore$;
    params$ = this.qp.params$;
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(
        private fetchClaimsService: FetchClaimsService,
        private router: Router,
        private qp: QueryParamsService<Filters>,
        private shopCreationService: ShopCreationService
    ) {}

    search(filters: Filters): void {
        void this.qp.set(filters);
        this.fetchClaimsService.search(filters);
    }

    fetchMore(): void {
        this.fetchClaimsService.fetchMore();
    }

    refresh(): void {
        this.fetchClaimsService.refresh();
    }

    goToClaimDetails(id: number): void {
        void this.router.navigate(['claim-section', 'claims', id]);
    }

    createShop(): void {
        this.shopCreationService.createShop();
    }
}
