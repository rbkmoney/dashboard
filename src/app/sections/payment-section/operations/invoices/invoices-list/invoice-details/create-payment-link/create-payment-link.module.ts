import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { CreateInvoiceModule as FormCreateInvoiceModule } from '../../../../../../create-invoice';
import { CreatePaymentLinkModule as ApiCreatePaymentLinkModule } from '../../../../../../create-payment-link';
import { CreatePaymentLinkDialogComponent } from './components/create-payment-link-dialog/create-payment-link-dialog.component';
import { CreatePaymentLinkService } from './create-payment-link.service';

@NgModule({
    imports: [CommonModule, TranslocoModule, FormCreateInvoiceModule, ApiCreatePaymentLinkModule],
    declarations: [CreatePaymentLinkDialogComponent],
    providers: [CreatePaymentLinkService],
})
export class CreatePaymentLinkModule {}
