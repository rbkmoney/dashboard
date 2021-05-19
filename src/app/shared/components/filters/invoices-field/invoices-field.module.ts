import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { MultiselectFilterModule } from '@dsh/components/filters/multiselect-filter';
import { MultivalueModule } from '@dsh/components/filters/multivalue';

import { InvoicesFieldComponent } from './invoices-field.component';

const EXPORTED_DECLARATIONS = [InvoicesFieldComponent];

@NgModule({
    imports: [MultiselectFilterModule, CommonModule, TranslocoModule, MultivalueModule, ReactiveFormsModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class InvoicesFieldModule {}
