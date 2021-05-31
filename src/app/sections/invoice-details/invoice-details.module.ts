import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceSearchService, PaymentSearchService } from '@dsh/api/search';
import { CreatePaymentLinkModule } from '@dsh/app/shared/components/create-payment-link';
import { ToMajorModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { ShopDetailsModule } from '../shop-details/shop-details.module';
import { CartComponent } from './cart/cart.component';
import { ItemComponent } from './cart/item/item.component';
import { DetailsComponent } from './details/details.component';
import { StatusDetailsItemComponent } from './details/status-details-item';
import { InvoiceDetailsRoutingModule } from './invoice-details-routing.module';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceDetailsService } from './invoice-details.service';
import { CreatePaymentLinkDialogComponent, PaymentLinkComponent } from './payment-link';
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
        MatIconModule,
        MatDialogModule,
        CreatePaymentLinkModule,
    ],
    declarations: [
        InvoiceDetailsComponent,
        StatusDetailsItemComponent,
        DetailsComponent,
        CartComponent,
        ItemComponent,
        PaymentsComponent,
        PaymentComponent,
        PaymentLinkComponent,
        CreatePaymentLinkDialogComponent,
    ],
    exports: [StatusDetailsItemComponent],
    providers: [InvoiceSearchService, PaymentSearchService, InvoiceDetailsService],
})
export class InvoiceDetailsModule {}
