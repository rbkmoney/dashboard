import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { DialogModule } from '@dsh/app/shared/components/dialog';

import { CreateInvoiceFormModule } from '../../../../../../create-invoice-form';
import { CreatePaymentLinkModule as ApiCreatePaymentLinkModule } from '../../../../../../create-payment-link';
import { CreatePaymentLinkDialogComponent } from './components/create-payment-link-dialog/create-payment-link-dialog.component';
import { CreatePaymentLinkService } from './create-payment-link.service';

@NgModule({
    imports: [CommonModule, TranslocoModule, CreateInvoiceFormModule, ApiCreatePaymentLinkModule, DialogModule],
    declarations: [CreatePaymentLinkDialogComponent],
    providers: [CreatePaymentLinkService],
})
export class CreatePaymentLinkModule {}
