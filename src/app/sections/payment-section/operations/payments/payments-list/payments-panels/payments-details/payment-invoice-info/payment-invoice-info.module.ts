import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentInvoiceInfoComponent } from './payment-invoice-info.component';
import { InvoiceDetailsModule } from '@dsh/app/shared/components';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeadlineModule } from '@dsh/components/layout';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    imports: [
        CommonModule,
        InvoiceDetailsModule,
        TranslocoModule,
        FlexLayoutModule,
        HeadlineModule,
        MatIconModule,
    ],
    declarations: [PaymentInvoiceInfoComponent],
    exports: [PaymentInvoiceInfoComponent],
})
export class PaymentInvoiceInfoModule {
}
