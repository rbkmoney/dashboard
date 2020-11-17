import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ContractDetailsModule, PayoutToolModule } from '@dsh/app/shared/components';
import { ButtonModule } from '@dsh/components/buttons';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
import { AccordionModule, CardModule, DetailsItemModule, RowModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { ToMajorModule } from '../../../../../to-major';
import { CategoryPipe } from '../shops-panels-list/category.pipe';
import { ShopsBalanceService } from './services/shops-balance/shops-balance.service';
import { ShopBalanceComponent } from './shop-balance/shop-balance.component';
import { ShopContractDetailsComponent } from './shop-contract-details';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ShopPayoutToolDetailsComponent } from './shop-payout-tool-details';
import { ShopRowComponent } from './shop-row';
import { ShopRowHeaderComponent } from './shop-row-header';
import { ShopsListComponent } from './shops-list.component';

@NgModule({
    imports: [
        CommonModule,
        LastUpdatedModule,
        AccordionModule,
        CardModule,
        FlexLayoutModule,
        ButtonModule,
        TranslocoModule,
        RowModule,
        ToMajorModule,
        DetailsItemModule,
        MatDividerModule,
        ContractDetailsModule,
        ClipboardModule,
        PayoutToolModule,
        ShowMorePanelModule,
    ],
    declarations: [
        CategoryPipe,
        ShopsListComponent,
        ShopRowHeaderComponent,
        ShopRowComponent,
        ShopDetailsComponent,
        ShopBalanceComponent,
        ShopContractDetailsComponent,
        ShopPayoutToolDetailsComponent,
    ],
    exports: [ShopsListComponent],
    providers: [ShopsBalanceService],
})
export class ShopListModule {}
