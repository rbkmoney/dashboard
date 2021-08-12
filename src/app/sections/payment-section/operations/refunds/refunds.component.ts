import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

import { QueryParamsService } from '@dsh/app/shared/services/query-params';

import { PaymentInstitutionRealmService } from '../../services/payment-institution-realm/payment-institution-realm.service';
import { RealmShopsService } from '../../services/realm-shops/realm-shops.service';
import { Filters } from './refunds-search-filters';
import { FetchRefundsService } from './services/fetch-refunds/fetch-refunds.service';
import { RefundsExpandedIdManager } from './services/refunds-expanded-id-manager/refunds-expanded-id-manager.service';

@Component({
    selector: 'dsh-refunds',
    templateUrl: 'refunds.component.html',
    providers: [FetchRefundsService, RefundsExpandedIdManager],
})
export class RefundsComponent implements OnInit {
    refunds$ = this.fetchRefundsService.searchResult$;
    isLoading$ = this.fetchRefundsService.isLoading$;
    hasMore$ = this.fetchRefundsService.hasMore$;
    lastUpdated$ = this.fetchRefundsService.lastUpdated$;
    expandedId$ = this.refundsExpandedIdManager.expandedId$;
    params$ = this.qp.params$;
    fetchErrors$ = this.fetchRefundsService.errors$;
    realm$ = this.realmService.realm$;
    shops$ = this.realmShopsService.shops$;

    constructor(
        private fetchRefundsService: FetchRefundsService,
        private refundsExpandedIdManager: RefundsExpandedIdManager,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private realmService: PaymentInstitutionRealmService,
        private qp: QueryParamsService<Filters>,
        private realmShopsService: RealmShopsService
    ) {}

    ngOnInit(): void {
        this.fetchRefundsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('refunds.fetchError', null, 'operations'), 'OK')
        );
    }

    searchParamsChanges(p: Filters): void {
        void this.qp.set(p);
        const { dateRange, ...params } = p;
        this.fetchRefundsService.search({
            realm: this.realmService.realm,
            fromTime: dateRange.start.utc().format(),
            toTime: dateRange.end.utc().format(),
            ...params,
        });
    }

    expandedIdChange(id: number): void {
        this.refundsExpandedIdManager.expandedIdChange(id);
    }

    fetchMore(): void {
        this.fetchRefundsService.fetchMore();
    }

    refresh(): void {
        this.fetchRefundsService.refresh();
    }
}
