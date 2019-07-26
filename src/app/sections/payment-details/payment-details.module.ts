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
import { DetailsItemComponent } from './details-item/details-item.component';
import { PaymentToolComponent } from './payment-tool/payment-tool.component';
import { AmountPipe } from './amount.pipe';
import { PayerDetailsComponent } from './payer-details/payer-details.component';
import { HoldDetailsComponent } from './hold-details/hold-details.component';
import { ButtonModule } from '../../button';
import { RecurrentDetailsComponent } from './recurrent-details/recurrent-details.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { RefundsComponent } from './refunds/refunds.component';
import { RefundItemComponent } from './refunds/refund-item/refund-item.component';
import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { StatusDetailsItemComponent } from './status-details-item/status-details-item.component';
import { SecondaryTitleDirective } from './secondary-title/secondary-title.directive';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { BankCardPipe } from './bank-card.pipe';
import { TimeUntilHoldPipe } from './time-until-hold.pipe';
import { HoldDatePipe } from './hold-date.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { DigitalWalletComponent } from './payment-tool/digital-wallet/digital-wallet.component';
import { BankCardComponent } from './payment-tool/bank-card/bank-card.component';
import { PaymentTerminalComponent } from './payment-tool/payment-terminal/payment-terminal.component';
import { SearchModule } from '../../search/search.module';
import { PaymentsModule } from '../payment-section/operations/payments/payments.module';

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
        PaymentDetailsRoutingModule,
        SearchModule,
        PaymentsModule
    ],
    declarations: [
        PaymentDetailsComponent,
        DetailsComponent,
        DetailsItemComponent,
        StatusDetailsItemComponent,
        PaymentToolComponent,
        AmountPipe,
        PayerDetailsComponent,
        HoldDetailsComponent,
        RecurrentDetailsComponent,
        InvoiceDetailsComponent,
        ShopDetailsComponent,
        RefundsComponent,
        RefundItemComponent,
        SecondaryTitleDirective,
        TimeUntilHoldPipe,
        CurrencySymbolPipe,
        BankCardPipe,
        HoldDatePipe,
        PhoneNumberPipe,
        DigitalWalletComponent,
        BankCardComponent,
        PaymentTerminalComponent
    ],
    exports: [PaymentDetailsComponent]
})
export class PaymentDetailsModule {}
