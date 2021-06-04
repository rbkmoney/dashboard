import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { ButtonModule } from '@dsh/components/buttons';

import { FulfillInvoiceDialogComponent } from './components/cancel-invoice-dialog/fulfill-invoice-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        ButtonModule,
        BaseDialogModule,
    ],
    declarations: [FulfillInvoiceDialogComponent],
})
export class FulfillInvoiceModule {}
