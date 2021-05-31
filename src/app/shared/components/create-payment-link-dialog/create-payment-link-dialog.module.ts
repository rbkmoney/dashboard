import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { DialogModule } from '@dsh/app/shared/components/dialog';

import { CreatePaymentLinkModule as ApiCreatePaymentLinkModule } from '../../../sections/create-payment-link';
import { CreatePaymentLinkDialogComponent } from './create-payment-link-dialog.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, ApiCreatePaymentLinkModule, DialogModule],
    declarations: [CreatePaymentLinkDialogComponent],
})
export class CreatePaymentLinkDialogModule {}
