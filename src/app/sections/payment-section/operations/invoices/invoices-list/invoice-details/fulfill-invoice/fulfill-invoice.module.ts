import { NgModule } from '@angular/core';
import { CreateInvoiceModule as FormCreateInvoiceModule } from '../../../../../../create-invoice';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { FulfillInvoiceDialogComponent } from './components/cancel-invoice-dialog/fulfill-invoice-dialog.component';
import { CreatePaymentLinkModule as ApiCreatePaymentLinkModule } from '../../../../../../create-payment-link';
import { FulfillInvoiceService } from './fulfill-invoice.service';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '@dsh/components/buttons';

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
    providers: [FulfillInvoiceService],
})
export class FulfillInvoiceModule {}
