import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { PaymentDetailsComponent } from './payment-details.component';
import { RefundsModule } from './refunds';
import { RecurrentDetailsModule } from './recurrent-details';
import { PaymentToolModule } from './payment-tool';
import { StatusDetailsItemModule } from './status-details-item';
import { PayerDetailsModule } from './payer-details';
import { MakeRecurrentModule } from './make-recurrent';
import { InvoiceDetailsModule } from './invoice-details';
import { HoldDetailsModule } from './hold-details';
import { DetailsModule } from './details';
import { HeadlineModule } from '../../layout/headline';
import { ShopDetailsModule } from '../shop-details/shop-details.module';
import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { PaymentSearchService } from '../../api/search';
import { SpinnerModule } from '../../spinner';

@NgModule({
    imports: [
        DetailsModule,
        HoldDetailsModule,
        InvoiceDetailsModule,
        MakeRecurrentModule,
        PayerDetailsModule,
        PaymentToolModule,
        RecurrentDetailsModule,
        RefundsModule,
        StatusDetailsItemModule,
        HeadlineModule,
        CommonModule,
        FlexModule,
        ShopDetailsModule,
        TranslocoModule,
        PaymentDetailsRoutingModule,
        SpinnerModule
    ],
    declarations: [PaymentDetailsComponent],
    providers: [PaymentSearchService]
})
export class PaymentDetailsModule {}
