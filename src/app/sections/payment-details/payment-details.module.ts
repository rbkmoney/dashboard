import { NgModule } from '@angular/core';
import {
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '../../layout';
import { PaymentDetailsComponent } from './payment-details.component';
import { StatusModule } from '../../status';
import { LocaleModule } from '../../locale';
import { DetailsComponent } from './details';
import { CardModule } from '../../layout/card';
import { DetailsItemComponent } from './details-item';
import {
    BankCardComponent,
    DigitalWalletComponent,
    PaymentTerminalComponent,
    PaymentToolComponent
} from './payment-tool';
import { AmountPipe } from './amount.pipe';
import { CustomerPayerComponent, PayerDetailsComponent, PaymentResourcePayerComponent } from './payer-details';
import { HoldDetailsComponent } from './hold-details';
import { ButtonModule } from '../../button';
import { RecurrentDetailsComponent } from './recurrent-details';
import { InvoiceDetailsComponent } from './invoice-details';
import { RefundItemComponent, RefundsComponent } from './refunds';
import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { StatusDetailsItemComponent } from './status-details-item';
import { SecondaryTitleDirective } from './secondary-title';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { BankCardPipe } from './bank-card.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { SearchModule } from '../../search';
import { ShopDetailsComponent, ShopLocationUrlComponent } from './shop-details';
import { ViewUtilsModule } from '../../view-utils';
import { MakeRecurrentComponent } from './make-recurrent';
import { InvoiceModule } from '../../invoice';
import { ShopModule } from '../../shop';
import { HeadlineComponent } from './headline';
import { HumanizeDurationModule } from '../../humanize-duration';
import { CancelHoldComponent } from './hold-details/cancel-hold/cancel-hold.component';
import { PaymentModule } from '../../payment';
import { AcceptHoldComponent } from './hold-details/accept-hold/accept-hold.component';

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
        ViewUtilsModule,
        InvoiceModule,
        ShopModule,
        HumanizeDurationModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        PaymentModule,
        MatCheckboxModule
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
        CurrencySymbolPipe,
        BankCardPipe,
        PhoneNumberPipe,
        DigitalWalletComponent,
        BankCardComponent,
        PaymentTerminalComponent,
        CustomerPayerComponent,
        PaymentResourcePayerComponent,
        ShopLocationUrlComponent,
        MakeRecurrentComponent,
        HeadlineComponent,
        CancelHoldComponent,
        AcceptHoldComponent
    ],
    entryComponents: [CancelHoldComponent, AcceptHoldComponent]
})
export class PaymentDetailsModule {}
