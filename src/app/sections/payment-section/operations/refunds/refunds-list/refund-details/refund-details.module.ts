import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { PaymentModule } from '@dsh/api/payment';
import {
    InvoiceDetailsModule,
    PaymentDetailsModule,
    RefundDetailsModule as ApiRefundDetailsModule,
} from '@dsh/app/shared/components';
import { ApiModelRefsModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { RefundInvoiceInfoComponent } from './components/refund-invoice-info/refund-invoice-info.component';
import { RefundMainInfoComponent } from './components/refund-main-info/refund-main-info.component';
import { RefundPaymentInfoComponent } from './components/refund-payment-info/refund-payment-info.component';
import { RefundDetailsComponent } from './refund-details.component';

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
        PaymentModule,
        RouterModule,
        MatIconModule,
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
