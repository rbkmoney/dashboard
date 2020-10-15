import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { pluck, shareReplay, take } from 'rxjs/operators';

import { SearchFiltersParams } from '../reports/reports-search-filters';
import { CreatePayoutService } from './create-payout';
import { FetchPayoutsService } from './fetch-payouts.service';
import { PayoutsExpandedIdManager } from './payouts-expanded-id-manager.service';
import { PayoutsSearchFiltersStore } from './payouts-search-filters-store.service';

@Component({
    selector: 'dsh-payouts',
    templateUrl: 'payouts.component.html',
    styleUrls: ['payouts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchPayoutsService, PayoutsSearchFiltersStore, PayoutsExpandedIdManager],
})
export class PayoutsComponent implements OnInit, OnDestroy {
    payouts$ = this.fetchPayoutsService.searchResult$;
    isLoading$ = this.fetchPayoutsService.isLoading$;
    hasMore$ = this.fetchPayoutsService.hasMore$;
    lastUpdated$ = this.fetchPayoutsService.lastUpdated$;
    expandedId$ = this.payoutsExpandedIdManager.expandedId$;
    initSearchParams$ = this.payoutsSearchFiltersStore.data$.pipe(take(1));
    fetchErrors$ = this.fetchPayoutsService.errors$;

    envID$ = this.route.params.pipe(pluck('envID'), shareReplay(1));

    constructor(
        private fetchPayoutsService: FetchPayoutsService,
        private createPayoutService: CreatePayoutService,
        private payoutsExpandedIdManager: PayoutsExpandedIdManager,
        private payoutsSearchFiltersStore: PayoutsSearchFiltersStore,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit() {
        this.envID$.subscribe((envID) => this.createPayoutService.init(envID));
        this.createPayoutService.payoutCreated$.subscribe(() => {
            this.snackBar.open(this.transloco.translate('payouts.created', null, 'payouts|scoped'), 'OK', {
                duration: 2000,
            });
            this.refresh();
        });
        this.fetchPayoutsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('httpError'), 'OK')
        );
    }

    ngOnDestroy() {
        this.createPayoutService.destroy();
    }

    createPayout() {
        this.createPayoutService.createPayout();
    }

    searchParamsChanges(p: SearchFiltersParams) {
        this.fetchPayoutsService.search(p);
        this.payoutsSearchFiltersStore.preserve(p);
    }

    expandedIdChange(id: number) {
        this.payoutsExpandedIdManager.expandedIdChange(id);
    }

    fetchMore() {
        this.fetchPayoutsService.fetchMore();
    }

    refresh() {
        this.fetchPayoutsService.refresh();
    }
}
