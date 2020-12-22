import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ToMajorModule } from '@dsh/app/shared/pipes';
import { StatusModule } from '@dsh/components/indicators';
import { DetailsItemModule } from '@dsh/components/layout';

import { PaymentDetailStatusComponent } from './components/payment-detail-status/payment-detail-status.component';
import { PaymentMainInfoComponent } from './payment-main-info.component';
import { PaymentToolModule } from './payment-tool';
import { ErrorToMessagePipe } from './pipes/error-to-message/error-to-message.pipe';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        DetailsItemModule,
        StatusModule,
        ToMajorModule,
        PaymentToolModule,
    ],
    declarations: [PaymentMainInfoComponent, PaymentDetailStatusComponent, ErrorToMessagePipe],
    exports: [PaymentMainInfoComponent],
})
export class PaymentMainInfoModule {}
