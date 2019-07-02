import { NgModule } from '@angular/core';
import { MatDividerModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../../layout';
import { PaymentDetailsComponent } from './payment-details.component';
import { StatusModule } from '../../status';
import { DetailsHeadlineComponent } from './details-headline/details-headline.component';
import { LocaleModule } from '../../locale';
import { SecondaryTitleDirective } from './secondary-title.directive';
import { DetailsComponent } from './details/details.component';
import { CardModule } from '../../layout/card';
import { DetailItemComponent } from './detail-item/detail-item.component';
import { StatusItemComponent } from './detail-item/status-item/status-item.component';
import { FormatTimePipe } from './format-time.pipe';
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
        MatDividerModule
    ],
    declarations: [
        PaymentDetailsComponent,
        DetailsHeadlineComponent,
        SecondaryTitleDirective,
        DetailsComponent,
        DetailItemComponent,
        StatusItemComponent,
        FormatTimePipe,
        PaymentToolComponent,
        FormatAmountPipe,
        FormatPercentPipe,
        PayerDetailsComponent,
        HoldDetailsComponent,
        ReccurentDetailsComponent,
        InvoiceDetailsComponent,
        ShopDetailsComponent,
        RefundsComponent,
        RefundItemComponent
    ],
    exports: [PaymentDetailsComponent]
})
export class PaymentDetailsModule {}
