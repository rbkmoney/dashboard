import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { ErrorModule } from '@dsh/app/shared/services';

import { PaymentDetailsComponent } from './payment-details.component';
import { PaymentInvoiceInfoModule } from './payment-invoice-info';
import { PaymentMainInfoModule } from './payment-main-info';
import { RefundsModule } from './refunds';
import { InvoiceDetailsService } from './services/invoice-details.service';

@NgModule({
    imports: [
        CommonModule,
        FlexModule,
        TranslocoModule,
        PaymentInvoiceInfoModule,
        MatDividerModule,
        PaymentMainInfoModule,
        ErrorModule,
        RefundsModule,
    ],
    declarations: [PaymentDetailsComponent],
    exports: [PaymentDetailsComponent],
    providers: [InvoiceDetailsService],
})
export class PaymentsDetailsModule {}
