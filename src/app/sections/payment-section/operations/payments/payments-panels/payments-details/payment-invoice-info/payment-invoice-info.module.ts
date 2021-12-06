import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceDetailsModule } from '@dsh/app/shared/components';

import { PaymentInvoiceInfoComponent } from './payment-invoice-info.component';

@NgModule({
    imports: [
        CommonModule,
        InvoiceDetailsModule,
        TranslocoModule,
        FlexLayoutModule,
        MatIconModule,
        RouterModule.forChild([{ path: '', component: PaymentInvoiceInfoComponent }]),
    ],
    declarations: [PaymentInvoiceInfoComponent],
    exports: [PaymentInvoiceInfoComponent],
})
export class PaymentInvoiceInfoModule {}
