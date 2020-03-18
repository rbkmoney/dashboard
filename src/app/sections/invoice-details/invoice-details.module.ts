import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { InvoiceSearchService, PaymentSearchService } from '../../api/search';
import { DetailsItemModule } from '../../details-item/details-item.module';
import { FromMinorModule } from '../../from-minor';
import { LayoutModule } from '../../layout';
import { SpinnerModule } from '../../spinner';
import { StatusModule } from '../../status';
import { ShopDetailsModule } from '../shop-details/shop-details.module';
import { CartComponent } from './cart/cart.component';
import { ItemComponent } from './cart/item/item.component';
import { DetailsComponent } from './details/details.component';
import { StatusDetailsItemComponent } from './details/status-details-item';
import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { PaymentComponent } from './payments/payment/payment.component';
import { PaymentsComponent } from './payments/payments.component';

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
