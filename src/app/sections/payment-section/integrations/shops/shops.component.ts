import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, take } from 'rxjs/operators';

import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ShopCreationService } from '@dsh/app/shared/components/shop-creation';

import { RealmShopsService } from '../../services/realm-shops/realm-shops.service';
import { FetchShopsService } from './services/fetch-shops/fetch-shops.service';
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
})
export class ShopsComponent implements OnInit {
    shops$ = this.shopsService.shownShops$;
    isLoading$ = this.shopsService.isLoading$;
    lastUpdated$ = this.shopsService.lastUpdated$;
    hasMore$ = this.shopsService.hasMore$;

    constructor(
        private shopsService: FetchShopsService,
        private expandedIdManager: ShopsExpandedIdManagerService,
        private createShopService: ShopCreationService,
        private route: ActivatedRoute,
        private realmShopsService: RealmShopsService
    ) {}

    ngOnInit(): void {
        this.route.params.pipe(take(1), pluck('realm')).subscribe((realm: PaymentInstitutionRealm) => {
            this.shopsService.initRealm(realm);
        });
        this.expandedIdManager.expandedId$.pipe(take(1)).subscribe((offsetIndex: number) => {
            this.shopsService.initOffsetIndex(offsetIndex);
        });
    }

    createShop(): void {
        this.createShopService.createShop(this.realmShopsService.shops$);
    }

    refreshData(): void {
        this.shopsService.refreshData();
    }

    showMore(): void {
        this.shopsService.showMore();
    }
}
