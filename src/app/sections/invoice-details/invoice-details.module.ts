import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';

import { StatusDetailsItemComponent } from './details/status-details-item';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceSearchService } from '../../api/search';
import { ShopDetailsModule } from '../shop-details/shop-details.module';
import { SpinnerModule } from '../../spinner';
import { LayoutModule } from '../../layout';
import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';
import { DetailsItemModule } from '../../details-item/details-item.module';
import { StatusModule } from '../../status';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { ItemComponent } from './cart/item/item.component';

@NgModule({
    imports: [
        CommonModule,
        ShopDetailsModule,
        SpinnerModule,
        FlexLayoutModule,
        LayoutModule,
        TranslocoModule,
        DetailsItemModule,
        StatusModule,
        InvoiceDetailsRoutingModule
    ],
    declarations: [InvoiceDetailsComponent, StatusDetailsItemComponent, DetailsComponent, CartComponent, ItemComponent],
    providers: [InvoiceSearchService]
})
export class InvoiceDetailsModule {}
