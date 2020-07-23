import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterModule } from '@dsh/components/filter';

import { FilterShopsComponent } from './filter-shops.component';

const EXPORTED_DECLARATIONS = [FilterShopsComponent];

@NgModule({
    imports: [FilterModule, CommonModule, TranslocoModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class FilterShopsModule {}
