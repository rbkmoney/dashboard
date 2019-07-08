import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../../layout';
import { PaymentDetailsComponent } from './payment-details.component';
import { StatusModule } from '../../status';
import { LocaleModule } from '../../locale';
import { DetailsComponent } from './details/details.component';
import { CardModule } from '../../layout/card';
import { DetailItemComponent } from './detail-item/detail-item.component';
import { PaymentToolComponent } from './payment-tool/payment-tool.component';
import { FormatAmountPipe } from './format-amount.pipe';
import { PayerDetailsComponent } from './payer-details/payer-details.component';
import { HoldDetailsComponent } from './hold-details/hold-details.component';
import { ButtonModule } from '../../button';
import { ReccurentDetailsComponent } from './reccurent-details/reccurent-details.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { RefundsComponent } from './refunds/refunds.component';
import { RefundItemComponent } from './refunds/refund-item/refund-item.component';
import { FormatPercentPipe } from './format-percent.pipe';
import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { StatusDetailItemComponent } from './status-detail-item/status-detail-item.component';
import { FormatCurrencyPipe } from './format-currency.pipe';
import { SecondaryTitleDirective } from './secondary-title/secondary-title.directive';

@NgModule({
    imports: [
        LayoutModule,
        StatusModule,
        MatIconModule,
        LocaleModule,
        FlexLayoutModule,
        RouterModule,
        CardModule,
        ButtonModule,
        CommonModule,
        PaymentDetailsRoutingModule
    ],
    declarations: [
        PaymentDetailsComponent,
        DetailsComponent,
        DetailItemComponent,
        StatusDetailItemComponent,
        PaymentToolComponent,
        FormatAmountPipe,
        FormatPercentPipe,
        FormatCurrencyPipe,
        PayerDetailsComponent,
        HoldDetailsComponent,
        ReccurentDetailsComponent,
        InvoiceDetailsComponent,
        ShopDetailsComponent,
        RefundsComponent,
        RefundItemComponent,
        SecondaryTitleDirective
    ],
    exports: [PaymentDetailsComponent]
})
export class PaymentDetailsModule {}
