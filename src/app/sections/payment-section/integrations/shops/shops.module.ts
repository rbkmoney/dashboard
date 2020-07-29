import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';

import { CreateShopModule } from '../../../create-shop';
import { CreateShopDialogComponent } from './create-shop-dialog';
import { ShopsPanelsListModule } from './shops-panels-list';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';

@NgModule({
    imports: [
        ShopsRoutingModule,
        FlexLayoutModule,
        TranslocoModule,
        ShopsPanelsListModule,
        CommonModule,
        SpinnerModule,
        EmptySearchResultModule,
        MatDividerModule,
        ButtonModule,
        CreateShopModule,
        RouterModule,
        MatRadioModule,
    ],
    declarations: [ShopsComponent, CreateShopDialogComponent],
    exports: [ShopsComponent],
})
export class ShopsModule {}
