import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { FormControlsModule } from '@dsh/components/form-controls';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { CreateInvoiceFormModule } from '../../../create-invoice-form';
import { CreateInvoiceTemplateModule } from '../../../create-invoice-template';
import { CreatePaymentLinkModule } from '../../../create-payment-link';
import { CreateInvoiceOrInvoiceTemplateComponent } from './create-invoice-or-invoice-template';
import { PaymentLinkRoutingModule } from './payment-link-routing.module';
import { PaymentLinkComponent } from './payment-link.component';

@NgModule({
    imports: [
        PaymentLinkRoutingModule,
        LayoutModule,
        TranslocoModule,
        FlexLayoutModule,
        FormControlsModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatRadioModule,
        ButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDividerModule,
        ConfirmActionDialogModule,
        MatDialogModule,
        CreatePaymentLinkModule,
        CreateInvoiceTemplateModule,
        CreateInvoiceFormModule,
    ],
    declarations: [PaymentLinkComponent, CreateInvoiceOrInvoiceTemplateComponent],
    exports: [PaymentLinkComponent],
})
export class PaymentLinkModule {}
