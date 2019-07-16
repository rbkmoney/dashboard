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
import { RecurrentDetailsComponent } from './recurrent-details/recurrent-details.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { RefundsComponent } from './refunds/refunds.component';
import { RefundItemComponent } from './refunds/refund-item/refund-item.component';
import { FormatPercentPipe } from './format-percent.pipe';
import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { StatusDetailItemComponent } from './status-detail-item/status-detail-item.component';
import { SecondaryTitleDirective } from './secondary-title/secondary-title.directive';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { FormatBankCardPipe } from './format-bank-card.pipe';
import { HoldTimePipe } from './hold-time.pipe';

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
        PayerDetailsComponent,
        HoldDetailsComponent,
        RecurrentDetailsComponent,
        InvoiceDetailsComponent,
        ShopDetailsComponent,
        RefundsComponent,
        RefundItemComponent,
        SecondaryTitleDirective,
        HoldTimePipe,
        CurrencySymbolPipe,
        FormatBankCardPipe
    ],
    exports: [PaymentDetailsComponent]
})
export class PaymentDetailsModule {}
