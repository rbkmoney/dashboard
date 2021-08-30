import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

import { QueryParamsService } from '@dsh/app/shared/services/query-params';

import { PaymentInstitutionRealmService } from '../services/payment-institution-realm/payment-institution-realm.service';
import { RealmShopsService } from '../services/realm-shops/realm-shops.service';
import { CreatePayoutDialogComponent } from './create-payout/create-payout-dialog.component';
import { FetchPayoutsService } from './fetch-payouts.service';
import { PayoutsExpandedIdManager } from './payouts-expanded-id-manager.service';
import { Filters } from './payouts-search-filters/payouts-search-filters.component';

@UntilDestroy()
@Component({
    selector: 'dsh-payouts',
    templateUrl: 'payouts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchPayoutsService, PayoutsExpandedIdManager],
})
export class PayoutsComponent implements OnInit {
    payouts$ = this.fetchPayoutsService.searchResult$;
    isLoading$ = this.fetchPayoutsService.isLoading$;
    hasMore$ = this.fetchPayoutsService.hasMore$;
    lastUpdated$ = this.fetchPayoutsService.lastUpdated$;
    expandedId$ = this.payoutsExpandedIdManager.expandedId$;
    params$ = this.qp.params$;
    fetchErrors$ = this.fetchPayoutsService.errors$;
    realm$ = this.realmService.realm$;
    shops$ = this.realmShopsService.shops$;

    constructor(
        private fetchPayoutsService: FetchPayoutsService,
        private payoutsExpandedIdManager: PayoutsExpandedIdManager,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private realmService: PaymentInstitutionRealmService,
        private qp: QueryParamsService<Filters>,
        private dialog: MatDialog,
        private realmShopsService: RealmShopsService
    ) {}

    ngOnInit(): void {
        this.fetchPayoutsService.errors$
            .pipe(untilDestroyed(this))
            .subscribe(() => this.snackBar.open(this.transloco.translate('httpError'), 'OK'));
    }

    createPayout(): void {
        this.dialog
            .open(CreatePayoutDialogComponent, { data: { realm: this.realmService.realm } })
            .afterClosed()
            .pipe(filter((r) => r === 'created'))
            .subscribe(() => {
                this.snackBar.open(this.transloco.translate('payouts.created', null, 'payouts'), 'OK', {
                    duration: 2000,
                });
                this.refresh();
            });
    }

    searchParamsChanges(p: Filters): void {
        void this.qp.set(p);
        const { dateRange, ...otherParams } = p;
        this.fetchPayoutsService.search({
            fromTime: dateRange.start.utc().format(),
            toTime: dateRange.end.utc().format(),
            realm: this.realmService.realm,
            ...otherParams,
        });
    }

    expandedIdChange(id: number): void {
        this.payoutsExpandedIdManager.expandedIdChange(id);
    }

    fetchMore(): void {
        this.fetchPayoutsService.fetchMore();
    }

    refresh(): void {
        this.fetchPayoutsService.refresh();
    }
}
