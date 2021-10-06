import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoicesFieldModule } from '@dsh/app/shared/components/inputs/invoices-field';

import { InvoicesFilterComponent } from './invoices-filter.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, TranslocoModule, InvoicesFieldModule],
    declarations: [InvoicesFilterComponent],
    exports: [InvoicesFilterComponent],
})
export class InvoicesFilterModule {}
