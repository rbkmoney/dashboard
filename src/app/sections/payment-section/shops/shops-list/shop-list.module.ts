import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared/pipes';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';
import { AccordionModule, CardModule, ExpandPanelModule, RowModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { ShopRowHeaderComponent } from './components/shop-row-header/shop-row-header.component';
import { ShopRowComponent } from './components/shop-row/shop-row.component';
import { ShopBalanceModule } from './shop-balance';
import { ShopDetailsModule } from './shop-details';
import { ShopsListComponent } from './shops-list.component';

@NgModule({
    imports: [
        CommonModule,
        LastUpdatedModule,
        AccordionModule,
        CardModule,
        RowModule,
        ToMajorModule,
        ShowMorePanelModule,
        EmptySearchResultModule,
        SpinnerModule,
        ShopDetailsModule,
        FlexLayoutModule,
        TranslocoModule,
        ShopBalanceModule,
        ExpandPanelModule,
    ],
    declarations: [ShopsListComponent, ShopRowHeaderComponent, ShopRowComponent],
    exports: [ShopsListComponent, ShopRowComponent],
})
export class ShopListModule {}
