import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { FilterButtonModule } from '@dsh/components/buttons';

import { FilterShopsComponent } from './filter-shops.component';

const EXPORTED_DECLARATIONS = [FilterShopsComponent];

@NgModule({
    imports: [FilterButtonModule, CommonModule, TranslocoModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class FilterShopsModule {}
