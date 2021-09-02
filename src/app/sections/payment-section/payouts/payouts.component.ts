import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { filter, first, switchMap, switchMapTo } from 'rxjs/operators';

import { QueryParamsService } from '@dsh/app/shared/services/query-params';

import { RealmMixService, PaymentInstitutionRealmService, RealmShopsService } from '../services';
import { CreatePayoutDialogComponent } from './create-payout/create-payout-dialog.component';
import { FetchPayoutsService } from './fetch-payouts.service';
import { PayoutsExpandedIdManager } from './payouts-expanded-id-manager.service';
import { Filters } from './payouts-search-filters/payouts-search-filters.component';
import { SearchParams } from './types/search-params';

@UntilDestroy()
@Component({
    selector: 'dsh-payouts',
    templateUrl: 'payouts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchPayoutsService, PayoutsExpandedIdManager, RealmMixService],
})
export class PayoutsComponent implements OnInit {
    payouts$ = this.fetchPayoutsService.searchResult$;
    isLoading$ = this.fetchPayoutsService.isLoading$;
    hasMore$ = this.fetchPayoutsService.hasMore$;
    lastUpdated$ = this.fetchPayoutsService.lastUpdated$;
    expandedId$ = this.payoutsExpandedIdManager.expandedId$;
    params$ = this.qp.params$;
    fetchErrors$ = this.fetchPayoutsService.errors$;
    shops$ = this.realmShopsService.shops$;

    private createPayout$ = new Subject();

    constructor(
        private fetchPayoutsService: FetchPayoutsService,
        private payoutsExpandedIdManager: PayoutsExpandedIdManager,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private realmService: PaymentInstitutionRealmService,
        private qp: QueryParamsService<Filters>,
        private dialog: MatDialog,
        private realmShopsService: RealmShopsService,
        private realmMixService: RealmMixService<SearchParams>
    ) {}

    ngOnInit(): void {
        this.fetchPayoutsService.errors$
            .pipe(untilDestroyed(this))
            .subscribe(() => this.snackBar.open(this.transloco.translate('httpError'), 'OK'));
        this.realmMixService.mixedValue$
            .pipe(untilDestroyed(this))
            .subscribe((v) => this.fetchPayoutsService.search(v));
        this.createPayout$
            .pipe(
                switchMapTo(this.realmService.realm$.pipe(first())),
                switchMap((realm) =>
                    this.dialog
                        .open(CreatePayoutDialogComponent, { data: { realm } })
                        .afterClosed()
                        .pipe(filter((r) => r === 'created'))
                ),
                untilDestroyed(this)
            )
            .subscribe(() => {
                this.snackBar.open(this.transloco.translate('payouts.created', null, 'payouts'), 'OK', {
                    duration: 2000,
                });
                this.refresh();
            });
    }

    createPayout(): void {
        this.createPayout$.next();
    }

    searchParamsChanges(p: Filters): void {
        void this.qp.set(p);
        const { dateRange, ...otherParams } = p;
        this.realmMixService.mix({
            fromTime: dateRange.start.utc().format(),
            toTime: dateRange.end.utc().format(),
            realm: null,
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
