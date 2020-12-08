import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import {
    InvoiceDetailsModule as InvoiceInvoiceDetailsModule,
    PaymentDetailsModule,
    RefundDetailsModule as ApiRefundDetailsModule,
} from '@dsh/app/shared/components';
import { ApiModelRefsModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { PaymentModule } from '../../../../../../api/payment';
import { ToMajorModule } from '../../../../../../to-major';
import { InvoiceCartLineComponent } from './components/invoice-cart-info/cart-info/invoice-cart-line.component';
import { InvoiceCartInfoComponent } from './components/invoice-cart-info/invoice-cart-info.component';
import { InvoiceMainInfoComponent } from './components/invoice-main-info/invoice-main-info.component';
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
    ],
    declarations: [
        InvoiceDetailsComponent,
        InvoiceMainInfoComponent,
        InvoiceCartInfoComponent,
        InvoiceCartLineComponent,
        TaxModeToTaxRatePipe,
    ],
    exports: [InvoiceDetailsComponent],
})
export class InvoiceDetailsModule {}
