import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';

import { DshTableComponent } from './table';
import {
    DshCellDefDirective,
    DshCellDirective,
    DshColumnDefDirective,
    DshFooterCellDefDirective,
    DshFooterCellDirective,
    DshHeaderCellDefDirective,
    DshHeaderCellDirective
} from './cell';
import {
    DshFooterRowComponent,
    DshFooterRowDefDirective,
    DshHeaderRowComponent,
    DshHeaderRowDefDirective,
    DshRowComponent,
    DshRowDefDirective
} from './row';

const EXPORTED_DECLARATIONS = [
    DshTableComponent,
    DshHeaderCellDefDirective,
    DshHeaderRowDefDirective,
    DshColumnDefDirective,
    DshCellDefDirective,
    DshRowDefDirective,
    DshFooterCellDefDirective,
    DshFooterRowDefDirective,
    DshHeaderCellDirective,
    DshCellDirective,
    DshFooterCellDirective,
    DshHeaderRowComponent,
    DshRowComponent,
    DshFooterRowComponent
];

@NgModule({
    imports: [CdkTableModule, CommonModule, MatTableModule],
    exports: EXPORTED_DECLARATIONS,
    declarations: EXPORTED_DECLARATIONS
})
export class DshTableModule {}
