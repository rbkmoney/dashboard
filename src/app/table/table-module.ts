import { NgModule } from '@angular/core';
import { DshTableComponent } from './table';
import { CdkTableModule } from '@angular/cdk/table';
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
import { CommonModule } from '@angular/common';

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
    imports: [CdkTableModule, CommonModule],
    exports: EXPORTED_DECLARATIONS,
    declarations: EXPORTED_DECLARATIONS
})
export class DshTableModule {}
