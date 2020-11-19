import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { pluck, take } from 'rxjs/operators';

import { PaymentInstitutionRealm } from '../../../../api/model';
import { CreateShopDialogComponent } from './components/create-shop-dialog';
import { FetchShopsService } from './services/fetch-shops/fetch-shops.service';
import { ShopsBalanceService } from './services/shops-balance/shops-balance.service';

@Component({
    selector: 'dsh-shops',
    templateUrl: './shops.component.html',
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FetchShopsService, ShopsBalanceService],
})
export class ShopsComponent implements OnInit {
    shops$ = this.shopsService.shops$;
    isLoading$ = this.shopsService.isLoading$;
    lastUpdated$ = this.shopsService.lastUpdated$;
    hasMore$ = this.shopsService.hasMore$;

    constructor(private shopsService: FetchShopsService, private dialog: MatDialog, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.pipe(take(1), pluck('realm')).subscribe((realm: PaymentInstitutionRealm) => {
            this.shopsService.setRealm(realm);
        });
        this.route.fragment.pipe(take(1)).subscribe((selectedID: string) => {
            this.shopsService.setSelectedID(selectedID);
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
