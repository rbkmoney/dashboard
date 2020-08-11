import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { MultiselectFilterModule } from '@dsh/components/filters/multiselect-filter';

import { FilterShopsComponent } from './filter-shops.component';

const EXPORTED_DECLARATIONS = [FilterShopsComponent];

@NgModule({
    imports: [MultiselectFilterModule, CommonModule, TranslocoModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class FilterShopsModule {}
