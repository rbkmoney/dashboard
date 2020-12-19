import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { CreateInvoiceModule as FormCreateInvoiceModule } from '../../../../create-invoice';
import { CreateInvoiceDialogComponent } from './components/create-invoice-dialog/create-invoice-dialog.component';
import { CreateInvoiceService } from './create-invoice.service';

@NgModule({
    imports: [CommonModule, TranslocoModule, FormCreateInvoiceModule],
    declarations: [CreateInvoiceDialogComponent],
    providers: [CreateInvoiceService],
})
export class CreateInvoiceModule {}
