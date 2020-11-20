import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import {
    InvoiceDetailsModule,
    PaymentDetailsModule,
    RefundDetailsModule as ApiRefundDetailsModule,
} from '@dsh/app/shared/*';
import { ApiModelRefsModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { RefundDetailsComponent } from './refund-details.component';
import { RefundInvoiceInfoComponent } from './refund-invoice-info';
import { RefundMainInfoComponent } from './refund-main-info';
import { RefundPaymentInfoComponent } from './refund-payment-info';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        CommonModule,
        MatSnackBarModule,
        MatDividerModule,
        IndicatorsModule,
        ApiModelRefsModule,
        ApiRefundDetailsModule,
        InvoiceDetailsModule,
        PaymentDetailsModule,
    ],
    declarations: [
        RefundDetailsComponent,
        RefundMainInfoComponent,
        RefundInvoiceInfoComponent,
        RefundPaymentInfoComponent,
    ],
    exports: [RefundDetailsComponent],
})
export class RefundDetailsModule {}
