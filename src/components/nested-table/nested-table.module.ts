import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { NestedTableColComponent } from './components/nested-table-col/nested-table-col.component';
import { NestedTableGroupComponent } from './components/nested-table-group/nested-table-group.component';
import { NestedTableRowComponent } from './components/nested-table-row/nested-table-row.component';
import { NestedTableCollapseModule } from './nested-table-collapse';
import { NestedTableComponent } from './nested-table.component';

const SHARED_COMPONENTS = [
    NestedTableComponent,
    NestedTableColComponent,
    NestedTableRowComponent,
    NestedTableGroupComponent,
];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule],
    declarations: SHARED_COMPONENTS,
    exports: [...SHARED_COMPONENTS, NestedTableCollapseModule],
})
export class NestedTableModule {}
