import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { NestedTableCollapseButtonComponent } from './components/nested-table-collapse-button/nested-table-collapse-button.component';
import { NestedTableCollapseBodyDirective } from './directives/nested-table-collapse-body/nested-table-collapse-body.directive';
import { NestedTableCollapseDirective } from './nested-table-collapse.directive';

const SHARED_COMPONENTS = [
    NestedTableCollapseDirective,
    NestedTableCollapseButtonComponent,
    NestedTableCollapseBodyDirective,
];

@NgModule({
    imports: [CommonModule, MatIconModule, FlexLayoutModule],
    declarations: SHARED_COMPONENTS,
    exports: SHARED_COMPONENTS,
})
export class NestedTableCollapseModule {}
