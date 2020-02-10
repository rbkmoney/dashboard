import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { RefundItemComponent, RefundsComponent } from './refunds';
import { LayoutModule } from '../../layout';
import { StatusModule } from '../../status';
import { DetailsComponent } from './details';
import { CardModule } from '../../layout/card';
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
import { PaymentDetailsComponent } from './payment-details.component';
import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { StatusDetailsItemComponent } from './status-details-item';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { BankCardPipe } from './bank-card.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { SearchModule } from '../../api/search';
import { FromMinorModule } from '../../from-minor';
import { MakeRecurrentComponent } from './make-recurrent';
import { InvoiceModule } from '../../api/invoice';
import { HumanizeDurationModule } from '../../humanize-duration';
import { DetailsItemModule } from '../../details-item/details-item.module';
import { ShopDetailsModule } from '../shop-details/shop-details.module';
import { SpinnerModule } from '../../spinner';

@NgModule({
    imports: [
        LayoutModule,
        StatusModule,
        MatIconModule,
        FlexLayoutModule,
        RouterModule,
        CardModule,
        ButtonModule,
        CommonModule,
        SearchModule,
        FromMinorModule,
        InvoiceModule,
        HumanizeDurationModule,
        TranslocoModule,
        DetailsItemModule,
        ShopDetailsModule,
        PaymentDetailsRoutingModule,
        SpinnerModule
    ],
    declarations: [
        PaymentDetailsComponent,
        DetailsComponent,
        StatusDetailsItemComponent,
        PaymentToolComponent,
        AmountPipe,
        PayerDetailsComponent,
        HoldDetailsComponent,
        RecurrentDetailsComponent,
        InvoiceDetailsComponent,
        RefundsComponent,
        RefundItemComponent,
        CurrencySymbolPipe,
        BankCardPipe,
        PhoneNumberPipe,
        DigitalWalletComponent,
        BankCardComponent,
        PaymentTerminalComponent,
        CustomerPayerComponent,
        PaymentResourcePayerComponent,
        MakeRecurrentComponent
    ],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }]
})
export class PaymentDetailsModule {}
