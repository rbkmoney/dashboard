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
    InvoiceDetailsModule as InvoiceInvoiceDetailsModule,
    PaymentDetailsModule,
    RefundDetailsModule as ApiRefundDetailsModule,
} from '@dsh/app/shared/components';
import { ApiModelRefsModule, ToMajorModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { CancelInvoiceModule } from './cancel-invoice';
import { InvoiceActionsComponent } from './components/invoice-actions/invoice-actions.component';
import { InvoiceCartLineComponent } from './components/invoice-cart-info/cart-info/invoice-cart-line.component';
import { InvoiceCartInfoComponent } from './components/invoice-cart-info/invoice-cart-info.component';
import { InvoiceMainInfoComponent } from './components/invoice-main-info/invoice-main-info.component';
import { InvoicePaymentsComponent } from './components/invoice-payments/invoice-payments.component';
import { CreatePaymentLinkModule } from './create-payment-link';
import { FulfillInvoiceModule } from './fulfill-invoice';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { TaxModeToTaxRatePipe } from './pipes/tax-mode-to-tax-rate/tax-mode-to-tax-rate.pipe';

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
        PaymentDetailsModule,
        PaymentModule,
        InvoiceInvoiceDetailsModule,
        ToMajorModule,
        CreatePaymentLinkModule,
        CancelInvoiceModule,
        FulfillInvoiceModule,
        RouterModule,
        MatIconModule,
    ],
    declarations: [
        InvoiceDetailsComponent,
        InvoiceMainInfoComponent,
        InvoiceCartInfoComponent,
        InvoiceCartLineComponent,
        TaxModeToTaxRatePipe,
        InvoiceActionsComponent,
        InvoicePaymentsComponent,
    ],
    exports: [InvoiceDetailsComponent],
})
export class InvoiceDetailsModule {}
