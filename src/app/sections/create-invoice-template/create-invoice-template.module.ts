import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
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

import { InvoiceTemplatesModule } from '../../api';
import { CreatePaymentLinkModule } from '../create-payment-link';
import { CreateInvoiceTemplateComponent } from './create-invoice-template.component';
import { CreateInvoiceTemplateService } from './create-invoice-template.service';

const EXPORTED_DECLARATIONS = [CreateInvoiceTemplateComponent];

@NgModule({
    imports: [
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
        InvoiceTemplatesModule,
        ConfirmActionDialogModule,
        MatDialogModule,
        CreatePaymentLinkModule,
        MatDatepickerModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [CreateInvoiceTemplateService],
})
export class CreateInvoiceTemplateModule {}
