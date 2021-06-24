import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FiltersGroupComponent } from './filters-group.component';

@NgModule({
    imports: [CommonModule, FlexLayoutModule],
    declarations: [FiltersGroupComponent],
    exports: [FiltersGroupComponent],
})
export class FiltersGroupModule {}
