import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceModule } from '@dsh/api/invoice';
import { InvoiceTemplatesModule } from '@dsh/api/invoice-templates';
import { UrlShortenerModule } from '@dsh/api/url-shortener';
import { ButtonModule } from '@dsh/components/buttons';
import { FormControlsModule } from '@dsh/components/form-controls';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { CreatePaymentLinkComponent } from './create-payment-link.component';
import { CreatePaymentLinkService } from './services/create-payment-link.service';

const EXPORTED_DECLARATIONS = [CreatePaymentLinkComponent];

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
        MatCheckboxModule,
        MatDividerModule,
        UrlShortenerModule,
        ClipboardModule,
        ConfirmActionDialogModule,
        MatSnackBarModule,
        MatFormFieldModule,
        InvoiceTemplatesModule,
        InvoiceModule,
        MatIconModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [CreatePaymentLinkService],
})
export class CreatePaymentLinkModule {}
