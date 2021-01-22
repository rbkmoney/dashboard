import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ApiModelRefsModule, ToMajorModule } from '@dsh/app/shared/pipes';
import { StatusModule } from '@dsh/components/indicators';
import { DetailsItemModule } from '@dsh/components/layout';
import { CollapseModule } from '@dsh/components/layout/collapse';

import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { ChargeAmountComponent } from './components/charge-amount/charge-amount.component';
import { PaymentFeeComponent } from './components/payment-fee/payment-fee.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { ResourcePayerComponent } from './components/resource-payer/resource-payer.component';
import { ShopNameComponent } from './components/shop-name/shop-name.component';
import { PaymentMainInfoComponent } from './payment-main-info.component';
import { PaymentToolModule } from './payment-tool';
import { PaymentErrorMessagePipe } from './pipes/payment-error-message/payment-error-message.pipe';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        DetailsItemModule,
        StatusModule,
        ToMajorModule,
        PaymentToolModule,
        CollapseModule,
        ApiModelRefsModule,
    ],
    declarations: [
        PaymentMainInfoComponent,
        PaymentStatusComponent,
        PaymentErrorMessagePipe,
        ChargeAmountComponent,
        PaymentFeeComponent,
        ResourcePayerComponent,
        ShopNameComponent,
        AdditionalInfoComponent,
    ],
    exports: [PaymentMainInfoComponent],
})
export class PaymentMainInfoModule {}
