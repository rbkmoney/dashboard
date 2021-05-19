import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterModule } from '@dsh/components/filter';
import { ListLabelModule } from '@dsh/pipes/list-label';

import { InvoicesFieldModule } from '../invoices-field';
import { InvoicesFilterComponent } from './invoices-filter.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, InvoicesFieldModule, ReactiveFormsModule, ListLabelModule, FilterModule],
    declarations: [InvoicesFilterComponent],
    exports: [InvoicesFilterComponent],
})
export class InvoicesFilterModule {}
