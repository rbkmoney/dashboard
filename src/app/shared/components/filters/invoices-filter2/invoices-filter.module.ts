import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { InvoicesFieldModule } from '@dsh/app/shared/components/filters/invoices-field';
import { FilterModule } from '@dsh/components/filter';
import { MultiselectFilterModule } from '@dsh/components/filters/multiselect-filter';
import { MultivalueModule } from '@dsh/components/filters/multivalue';
import { ListLabelModule } from '@dsh/pipes/list-label';

import { InvoicesFilterComponent } from './invoices-filter.component';

@NgModule({
    imports: [
        MultiselectFilterModule,
        CommonModule,
        TranslocoModule,
        MultivalueModule,
        InvoicesFieldModule,
        FilterModule,
        ReactiveFormsModule,
        ListLabelModule,
    ],
    declarations: [InvoicesFilterComponent],
    exports: [InvoicesFilterComponent],
})
export class InvoicesFilterModule {}
