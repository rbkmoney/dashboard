import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { InvoiceModule } from '../../api/invoice';
import { SearchModule } from '../../api/search';
import { DetailsItemModule } from '../../details-item/details-item.module';
import { FromMinorModule } from '../../from-minor';
import { HumanizeDurationModule } from '../../humanize-duration';
import { ShopDetailsModule } from '../shop-details/shop-details.module';
import { AmountPipe } from './amount.pipe';
import { BankCardPipe } from './bank-card.pipe';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { DetailsComponent } from './details';
import { HoldDetailsComponent } from './hold-details';
import { InvoiceDetailsComponent } from './invoice-details';
import { MakeRecurrentComponent } from './make-recurrent';
import { CustomerPayerComponent, PayerDetailsComponent, PaymentResourcePayerComponent } from './payer-details';
import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { PaymentDetailsComponent } from './payment-details.component';
import {
    BankCardComponent,
    DigitalWalletComponent,
    PaymentTerminalComponent,
    PaymentToolComponent
} from './payment-tool';
import { PhoneNumberPipe } from './phone-number.pipe';
import { RecurrentDetailsComponent } from './recurrent-details';
import { RefundItemComponent, RefundsComponent } from './refunds';
import { StatusDetailsItemComponent } from './status-details-item';

@NgModule({
    imports: [
        LayoutModule,
        MatIconModule,
        FlexLayoutModule,
        RouterModule,
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
        IndicatorsModule
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
