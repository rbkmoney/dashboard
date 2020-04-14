import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { InvoiceModule } from '../../api/invoice';
import { SearchModule } from '../../api/search';
import { FromMinorModule } from '../../from-minor';
import { HumanizeDurationModule } from '../../humanize-duration';
import { ShopDetailsModule } from '../shop-details/shop-details.module';
import { DetailsModule } from './details';
import { HoldDetailsModule } from './hold-details';
import { InvoiceDetailsModule } from './invoice-details';
import { MakeRecurrentModule } from './make-recurrent';
import { PayerDetailsModule } from './payer-details';
import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { PaymentDetailsComponent } from './payment-details.component';
import { PaymentToolModule } from './payment-tool';
import { RecurrentDetailsModule } from './recurrent-details';
import { RefundsModule } from './refunds';
import { CurrencySymbolPipe } from './utils/currency-symbol.pipe';

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
        ShopDetailsModule,
        PaymentDetailsRoutingModule,
        IndicatorsModule,
        DetailsModule,
        PaymentToolModule,
        PayerDetailsModule,
        HoldDetailsModule,
        MakeRecurrentModule,
        RecurrentDetailsModule,
        InvoiceDetailsModule,
        RefundsModule
    ],
    declarations: [PaymentDetailsComponent, CurrencySymbolPipe],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'main' }]
})
export class PaymentDetailsModule {}
