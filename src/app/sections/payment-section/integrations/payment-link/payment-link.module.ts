import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { FormControlsModule } from '@dsh/components/form-controls';
import { LayoutModule } from '@dsh/components/layout';

import { InvoiceTemplatesModule, UrlShortenerModule } from '../../../../api';
import { InvoiceTemplateFormComponent, InvoiceTemplateFormService } from './invoice-template-form';
import { PaymentLinkFormComponent, PaymentLinkFormService } from './payment-link-form';
import { PaymentLinkRoutingModule } from './payment-link-routing.module';
import { PaymentLinkComponent } from './payment-link.component';

const EXPORTED_DECLARATIONS = [PaymentLinkComponent];

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
        UrlShortenerModule,
        InvoiceTemplatesModule,
        ClipboardModule
    ],
    declarations: [...EXPORTED_DECLARATIONS, InvoiceTemplateFormComponent, PaymentLinkFormComponent],
    exports: EXPORTED_DECLARATIONS,
    providers: [PaymentLinkFormService, InvoiceTemplateFormService]
})
export class PaymentLinkModule {}
