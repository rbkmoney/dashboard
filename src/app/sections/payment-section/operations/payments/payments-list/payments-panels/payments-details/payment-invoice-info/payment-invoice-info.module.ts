import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceDetailsModule } from '@dsh/app/shared/components';
import { HeadlineModule } from '@dsh/components/layout';

import { PaymentInvoiceInfoComponent } from './payment-invoice-info.component';

@NgModule({
    imports: [CommonModule, InvoiceDetailsModule, TranslocoModule, FlexLayoutModule, HeadlineModule, MatIconModule],
    declarations: [PaymentInvoiceInfoComponent],
    exports: [PaymentInvoiceInfoComponent],
})
export class PaymentInvoiceInfoModule {}
