import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { StatusModule } from '../../status';
import { StatusDetailsItemComponent } from './details/status-details-item';
import { InvoiceSearchService, PaymentSearchService } from '../../api/search';
import { ShopDetailsModule } from '../shop-details/shop-details.module';
import { SpinnerModule } from '../../spinner';
import { LayoutModule } from '../../layout';
import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';
import { DetailsItemModule } from '../../details-item/details-item.module';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { ItemComponent } from './cart/item/item.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentComponent } from './payments/payment/payment.component';
import { ButtonModule } from '../../button';
import { FromMinorModule } from '../../from-minor';

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
        InvoiceDetailsRoutingModule,
        ButtonModule,
        FromMinorModule,
        MatIconModule
    ],
    declarations: [
        InvoiceDetailsComponent,
        StatusDetailsItemComponent,
        DetailsComponent,
        CartComponent,
        ItemComponent,
        PaymentsComponent,
        PaymentComponent
    ],
    providers: [InvoiceSearchService, PaymentSearchService]
})
export class InvoiceDetailsModule {}
