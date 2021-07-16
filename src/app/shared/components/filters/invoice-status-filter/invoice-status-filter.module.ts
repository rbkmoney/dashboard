import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoiceStatusFieldModule } from '@dsh/app/shared/components/inputs/invoice-status-field/invoice-status-field.module';
import { FilterModule } from '@dsh/components/filter';

import { InvoiceStatusFilterComponent } from './invoice-status-filter.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, FilterModule, InvoiceStatusFieldModule, ReactiveFormsModule],
    declarations: [InvoiceStatusFilterComponent],
    exports: [InvoiceStatusFilterComponent],
})
export class InvoiceStatusFilterModule {}
