import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { MultiInputFieldModule } from '@dsh/components/form-controls/multi-input-field';

import { InvoicesFieldComponent } from './invoices-field.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, MultiInputFieldModule, ReactiveFormsModule],
    declarations: [InvoicesFieldComponent],
    exports: [InvoicesFieldComponent],
})
export class InvoicesFieldModule {}
