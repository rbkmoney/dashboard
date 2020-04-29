import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { InvoiceSearchService, PaymentSearchService } from '../../api/search';
import { ToMajorModule } from '../../to-major';
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
        FlexLayoutModule,
        LayoutModule,
        TranslocoModule,
        IndicatorsModule,
        InvoiceDetailsRoutingModule,
        ButtonModule,
        ToMajorModule,
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
    exports: [StatusDetailsItemComponent, DetailsComponent],
    providers: [InvoiceSearchService, PaymentSearchService]
})
export class InvoiceDetailsModule {}
