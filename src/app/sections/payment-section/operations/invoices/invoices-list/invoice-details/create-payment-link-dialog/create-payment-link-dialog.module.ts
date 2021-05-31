import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { CreatePaymentLinkModule } from '@dsh/app/shared/components/create-payment-link';
import { DialogModule } from '@dsh/app/shared/components/dialog';

import { CreatePaymentLinkDialogComponent } from './create-payment-link-dialog.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, CreatePaymentLinkModule, DialogModule],
    declarations: [CreatePaymentLinkDialogComponent],
    exports: [CreatePaymentLinkDialogComponent],
})
export class CreatePaymentLinkDialogModule {}
