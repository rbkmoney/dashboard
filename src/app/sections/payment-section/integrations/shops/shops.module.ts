import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { CreateButtonShopComponent } from './components/create-shop-button/create-button-shop.component';
import { FetchShopsService } from './services/fetch-shops/fetch-shops.service';
import { ShopsBalanceService } from './services/shops-balance/shops-balance.service';
import { ShopsFiltersStoreService } from './services/shops-filters-store/shops-filters-store.service';
import { ShopsFiltersService } from './services/shops-filters/shops-filters.service';
import { ShopCreationModule } from './shop-creation';
import { ShopFiltersModule } from './shop-filters';
import { ShopsExpandedIdManagerService } from './shops-list/services/shops-expanded-id-manager/shops-expanded-id-manager.service';
import { ShopListModule } from './shops-list/shop-list.module';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';

@NgModule({
    imports: [
        ShopsRoutingModule,
        FlexLayoutModule,
        CommonModule,
        RouterModule,
        ShopListModule,
        ShopFiltersModule,
        ShopCreationModule,
        ButtonModule,
        TranslocoModule,
    ],
    declarations: [ShopsComponent, CreateButtonShopComponent],
    exports: [ShopsComponent],
    providers: [
        FetchShopsService,
        ShopsBalanceService,
        ShopsExpandedIdManagerService,
        ShopsFiltersService,
        ShopsFiltersStoreService,
    ],
})
export class ShopsModule {}
