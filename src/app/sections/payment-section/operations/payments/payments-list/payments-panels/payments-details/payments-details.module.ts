import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { PaymentDetailHeaderComponent } from './components/payment-detail-header/payment-detail-header.component';
import { PaymentDetailInfoComponent } from './components/payment-detail-info/payment-detail-info.component';
import { InvoiceDetailsModule as InvoiceDetailsSectionModule } from '../../../../../../invoice-details';
import { MatDividerModule } from '@angular/material/divider';
import { PaymentInvoiceInfoModule } from './payment-invoice-info/payment-invoice-info.module';

@NgModule({
    imports: [CommonModule, FlexModule, TranslocoModule, PaymentInvoiceInfoModule, InvoiceDetailsSectionModule, MatDividerModule],
    declarations: [PaymentDetailHeaderComponent, PaymentDetailInfoComponent],
    exports: [PaymentDetailHeaderComponent, PaymentDetailInfoComponent]
})
export class PaymentsDetailsModule {}
