import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { pluck, take } from 'rxjs/operators';

import { PaymentInstitutionRealm } from '../../../../api/model';
import { CreateShopDialogComponent } from './components/create-shop-dialog/create-shop-dialog.component';
import { FetchShopsService } from './services/fetch-shops/fetch-shops.service';
import { ShopsBalanceService } from './services/shops-balance/shops-balance.service';
import { ShopsFiltersStoreService } from './services/shops-filters-store/shops-filters-store.service';
import { ShopsFiltersService } from './services/shops-filters/shops-filters.service';
import { ShopsExpandedIdManagerService } from './shops-list/services/shops-expanded-id-manager/shops-expanded-id-manager.service';

@Component({
    selector: 'dsh-shops',
    templateUrl: 'shops.component.html',
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        FetchShopsService,
        ShopsBalanceService,
        ShopsExpandedIdManagerService,
        ShopsFiltersService,
        ShopsFiltersStoreService,
    ],
})
export class ShopsComponent implements OnInit {
    shops$ = this.shopsService.shownShops$;
    isLoading$ = this.shopsService.isLoading$;
    lastUpdated$ = this.shopsService.lastUpdated$;
    hasMore$ = this.shopsService.hasMore$;

    constructor(
        private shopsService: FetchShopsService,
        private expandedIdManager: ShopsExpandedIdManagerService,
        private dialog: MatDialog,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.pipe(take(1), pluck('realm')).subscribe((realm: PaymentInstitutionRealm) => {
            this.shopsService.initRealm(realm);
        });
        this.expandedIdManager.expandedId$.pipe(take(1)).subscribe((offsetIndex: number) => {
            this.shopsService.initOffsetIndex(offsetIndex);
        });
    }

    refreshData(): void {
        this.shopsService.refreshData();
    }

    showMore(): void {
        this.shopsService.showMore();
    }

    createShop(): void {
        this.dialog
            .open(CreateShopDialogComponent, {
                width: '552px',
                maxHeight: '90vh',
                disableClose: true,
                data: {
                    realm: this.route.snapshot.params.realm,
                },
            })
            .afterClosed()
            .pipe(take(1))
            .subscribe();
    }
}
