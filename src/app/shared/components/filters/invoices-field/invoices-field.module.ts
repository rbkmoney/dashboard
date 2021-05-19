import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { MultiselectFilterModule } from '@dsh/components/filters/multiselect-filter';
import { MultiInputFieldModule } from '@dsh/components/form-controls/multi-input-field';

import { InvoicesFieldComponent } from './invoices-field.component';

@NgModule({
    imports: [MultiselectFilterModule, CommonModule, TranslocoModule, MultiInputFieldModule, ReactiveFormsModule],
    declarations: [InvoicesFieldComponent],
    exports: [InvoicesFieldComponent],
})
export class InvoicesFieldModule {}
