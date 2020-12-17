import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { CreateInvoiceModule as FormCreateInvoiceModule } from '../../../../../../create-invoice';
import { CreatePaymentLinkModule as ApiCreatePaymentLinkModule } from '../../../../../../create-payment-link';
import { FulfillInvoiceDialogComponent } from './components/cancel-invoice-dialog/fulfill-invoice-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FormCreateInvoiceModule,
        ApiCreatePaymentLinkModule,
        FlexModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        ButtonModule,
    ],
    declarations: [FulfillInvoiceDialogComponent],
})
export class FulfillInvoiceModule {}