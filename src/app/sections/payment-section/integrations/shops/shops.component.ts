import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { ShopCreationService } from '@dsh/app/shared/components/shop-creation';

import { PaymentInstitutionRealmService } from '../../services/payment-institution-realm/payment-institution-realm.service';
import { RealmShopsService } from '../../services/realm-shops/realm-shops.service';
import { FetchShopsService } from './services/fetch-shops/fetch-shops.service';
import { ShopsExpandedIdManagerService } from './shops-list/services/shops-expanded-id-manager/shops-expanded-id-manager.service';

@Component({
    selector: 'dsh-shops',
    templateUrl: 'shops.component.html',
    styleUrls: ['shops.component.scss'],
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
        private realmShopsService: RealmShopsService,
        private realmService: PaymentInstitutionRealmService
    ) {}

    ngOnInit(): void {
        this.realmService.realm$.pipe(take(1)).subscribe((realm) => {
            this.shopsService.initRealm(realm);
        });
        this.expandedIdManager.expandedId$.pipe(take(1)).subscribe((offsetIndex: number) => {
            this.shopsService.initOffsetIndex(offsetIndex);
        });
    }

    createShop(): void {
        this.createShopService.createShop({ shops$: this.realmShopsService.shops$ });
    }

    refreshData(): void {
        this.shopsService.refreshData();
    }

    showMore(): void {
        this.shopsService.showMore();
    }
}
