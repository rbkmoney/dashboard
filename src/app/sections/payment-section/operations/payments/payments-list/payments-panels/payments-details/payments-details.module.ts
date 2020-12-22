import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceDetailsModule as InvoiceDetailsSectionModule } from '../../../../../../invoice-details';
import { PaymentDetailHeaderComponent } from './components/payment-detail-header/payment-detail-header.component';
import { PaymentDetailInfoComponent } from './components/payment-detail-info/payment-detail-info.component';
import { PaymentInvoiceInfoModule } from './payment-invoice-info/payment-invoice-info.module';
import { PaymentMainInfoModule } from './payment-main-info/payment-main-info.module';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        TranslocoModule,
        PaymentInvoiceInfoModule,
        InvoiceDetailsSectionModule,
        MatDividerModule,
        PaymentMainInfoModule,
    ],
    declarations: [PaymentDetailHeaderComponent, PaymentDetailInfoComponent],
    exports: [PaymentDetailHeaderComponent, PaymentDetailInfoComponent],
})
export class PaymentsDetailsModule {}
