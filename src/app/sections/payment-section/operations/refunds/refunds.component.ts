import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { QueryParamsService } from '@dsh/app/shared/services/query-params';

import { RealmMixinService } from '../../services';
import { RealmShopsService } from '../../services/realm-shops/realm-shops.service';
import { Filters, SearchFiltersParams } from './refunds-search-filters';
import { FetchRefundsService } from './services/fetch-refunds/fetch-refunds.service';
import { RefundsExpandedIdManager } from './services/refunds-expanded-id-manager/refunds-expanded-id-manager.service';

@UntilDestroy()
@Component({
    selector: 'dsh-refunds',
    templateUrl: 'refunds.component.html',
    providers: [FetchRefundsService, RefundsExpandedIdManager, RealmMixinService],
})
export class RefundsComponent implements OnInit {
    refunds$ = this.fetchRefundsService.searchResult$;
    isLoading$ = this.fetchRefundsService.isLoading$;
    hasMore$ = this.fetchRefundsService.hasMore$;
    lastUpdated$ = this.fetchRefundsService.lastUpdated$;
    expandedId$ = this.refundsExpandedIdManager.expandedId$;
    params$ = this.qp.params$;
    fetchErrors$ = this.fetchRefundsService.errors$;
    shops$ = this.realmShopsService.shops$;

    constructor(
        private fetchRefundsService: FetchRefundsService,
        private refundsExpandedIdManager: RefundsExpandedIdManager,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private qp: QueryParamsService<Filters>,
        private realmShopsService: RealmShopsService,
        private realmMixinService: RealmMixinService<SearchFiltersParams>
    ) {}

    ngOnInit(): void {
        this.fetchRefundsService.errors$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('refunds.fetchError', null, 'operations'), 'OK')
        );
        this.realmMixinService.valueAndRealm$
            .pipe(untilDestroyed(this))
            .subscribe((v) => this.fetchRefundsService.search(v));
    }

    searchParamsChanges(p: Filters): void {
        void this.qp.set(p);
        const { dateRange, ...params } = p;
        this.realmMixinService.valueChange({
            realm: null,
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
