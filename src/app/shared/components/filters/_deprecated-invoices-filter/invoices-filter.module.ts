import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { MultiValueFilterModule } from '@dsh/components/filters/multi-value-filter/multi-value-filter.module';
import { MultiselectFilterModule } from '@dsh/components/filters/multiselect-filter';

import { InvoicesFilterComponent } from './invoices-filter.component';

const EXPORTED_DECLARATIONS = [InvoicesFilterComponent];

@NgModule({
    imports: [MultiselectFilterModule, CommonModule, TranslocoModule, MultiValueFilterModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
/**
 * @deprecated
 */
export class InvoicesFilterModule {}
