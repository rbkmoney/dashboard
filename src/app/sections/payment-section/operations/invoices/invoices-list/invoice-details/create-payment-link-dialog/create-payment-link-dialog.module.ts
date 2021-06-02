import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { CreatePaymentLinkModule } from '@dsh/app/shared/components/create-payment-link';
import { DialogModule } from '@dsh/app/shared/components/dialog';
import { CreatePaymentLinkModule as CreatePaymentLinkServiceModule } from '@dsh/app/shared/services/create-payment-link';
import { ButtonModule } from '@dsh/components/buttons';

import { CreatePaymentLinkDialogComponent } from './create-payment-link-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        CreatePaymentLinkModule,
        DialogModule,
        ButtonModule,
        ReactiveFormsModule,
        CreatePaymentLinkServiceModule,
    ],
    declarations: [CreatePaymentLinkDialogComponent],
    exports: [CreatePaymentLinkDialogComponent],
})
export class CreatePaymentLinkDialogModule {}
