import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { CreateShopModule } from '../../../create-shop';
import { CreateShopDialogComponent } from './components/create-shop-dialog/create-shop-dialog.component';
import { ShopListModule } from './shops-list/shop-list.module';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';

@NgModule({
    imports: [
        ShopsRoutingModule,
        FlexLayoutModule,
        TranslocoModule,
        CommonModule,
        ButtonModule,
        CreateShopModule,
        RouterModule,
        MatRadioModule,
        ShopListModule,
    ],
    declarations: [ShopsComponent, CreateShopDialogComponent],
    exports: [ShopsComponent],
})
export class ShopsModule {}
