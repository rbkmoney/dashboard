import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { NestedTableColComponent } from '@dsh/components/nested-table/components/nested-table-col/nested-table-col.component';
import { NestedTableCollapseButtonComponent } from '@dsh/components/nested-table/components/nested-table-collapse-button/nested-table-collapse-button.component';
import { NestedTableGroupComponent } from '@dsh/components/nested-table/components/nested-table-group/nested-table-group.component';
import { NestedTableHeaderColComponent } from '@dsh/components/nested-table/components/nested-table-header-col/nested-table-header-col.component';
import { NestedTableRowComponent } from '@dsh/components/nested-table/components/nested-table-row/nested-table-row.component';
import { NestedTableCollapseBodyDirective } from '@dsh/components/nested-table/directives/nested-table-group-body/nested-table-collapse-body.directive';
import { NestedTableCollapseDirective } from '@dsh/components/nested-table/directives/nested-table-group/nested-table-collapse.directive';

import { NestedTableComponent } from './nested-table.component';

const SHARED_COMPONENTS = [
    NestedTableComponent,
    NestedTableCollapseDirective,
    NestedTableColComponent,
    NestedTableRowComponent,
    NestedTableCollapseButtonComponent,
    NestedTableCollapseBodyDirective,
    NestedTableGroupComponent,
    NestedTableHeaderColComponent,
];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule, MatIconModule],
    declarations: SHARED_COMPONENTS,
    exports: SHARED_COMPONENTS,
})
export class NestedTableModule {}
