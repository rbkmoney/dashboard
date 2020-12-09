import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceModule } from '@dsh/api/invoice';
import { ButtonModule } from '@dsh/components/buttons';
import { FormControlsModule, RangeDatepickerModule } from '@dsh/components/form-controls';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';

import { ShopSelectorModule } from '../shop-selector';
import { CreateInvoiceComponent } from './create-invoice.component';
import { CreateInvoiceService } from './create-invoice.service';

const EXPORTED_DECLARATIONS = [CreateInvoiceComponent];

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        FlexLayoutModule,
        ButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormControlsModule,
        MatSnackBarModule,
        TranslocoModule,
        MatMenuModule,
        RangeDatepickerModule,
        MatDialogModule,
        InvoiceModule,
        MatDatepickerModule,
        MatDividerModule,
        ShopSelectorModule,
        MatDialogModule,
        ConfirmActionDialogModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
    providers: [CreateInvoiceService],
})
export class CreateInvoiceModule {}
