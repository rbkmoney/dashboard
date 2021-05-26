import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { DialogModule } from '@dsh/app/shared/components/dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { CreateInvoiceFormModule } from '../../../../create-invoice-form';
import { CreateInvoiceDialogComponent } from './components/create-invoice-dialog/create-invoice-dialog.component';
import { CreateInvoiceService } from './create-invoice.service';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        CreateInvoiceFormModule,
        DialogModule,
        FlexLayoutModule,
        ButtonModule,
        ReactiveFormsModule,
    ],
    declarations: [CreateInvoiceDialogComponent],
    providers: [CreateInvoiceService],
})
export class CreateInvoiceModule {}
