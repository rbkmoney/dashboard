import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { pluck, shareReplay, take } from 'rxjs/operators';

import { SearchFiltersParams } from './refunds-search-filters';
import { FetchRefundsService } from './services/fetch-refunds/fetch-refunds.service';
import { RefundsExpandedIdManager } from './services/refunds-expanded-id-manager/refunds-expanded-id-manager.service';
import { RefundsSearchFiltersStore } from './services/refunds-search-filters-store/refunds-search-filters-store.service';

@Component({
    selector: 'dsh-refunds',
    templateUrl: 'refunds.component.html',
    providers: [FetchRefundsService, RefundsSearchFiltersStore, RefundsExpandedIdManager],
})
export class RefundsComponent implements OnInit {
    refunds$ = this.fetchRefundsService.searchResult$;
    isLoading$ = this.fetchRefundsService.isLoading$;
    hasMore$ = this.fetchRefundsService.hasMore$;
    lastUpdated$ = this.fetchRefundsService.lastUpdated$;
    expandedId$ = this.refundsExpandedIdManager.expandedId$;
    initSearchParams$ = this.refundsSearchFiltersStore.data$.pipe(take(1));
    fetchErrors$ = this.fetchRefundsService.errors$;

    realm$ = this.route.params.pipe(pluck('realm'), shareReplay(1));

    constructor(
        private fetchRefundsService: FetchRefundsService,
        private refundsExpandedIdManager: RefundsExpandedIdManager,
        private refundsSearchFiltersStore: RefundsSearchFiltersStore,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit() {
        this.fetchRefundsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('refunds.fetchError', null, 'operations'), 'OK')
        );
    }

    searchParamsChanges(p: SearchFiltersParams) {
        this.fetchRefundsService.search(p);
        this.refundsSearchFiltersStore.preserve(p);
    }

    expandedIdChange(id: number) {
        this.refundsExpandedIdManager.expandedIdChange(id);
    }

    fetchMore() {
        this.fetchRefundsService.fetchMore();
    }

    refresh() {
        this.fetchRefundsService.refresh();
    }
}
