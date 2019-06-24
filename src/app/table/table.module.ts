import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';

import { TableComponent } from './table';
import {
    CellDefDirective,
    CellDirective,
    ColumnDefDirective,
    FooterCellDefDirective,
    FooterCellDirective,
    HeaderCellDefDirective,
    HeaderCellDirective
} from './cell';
import {
    FooterRowComponent,
    FooterRowDefDirective,
    HeaderRowComponent,
    HeaderRowDefDirective,
    RowComponent,
    RowDefDirective
} from './row';

const EXPORTED_DECLARATIONS = [
    TableComponent,
    HeaderCellDefDirective,
    HeaderRowDefDirective,
    ColumnDefDirective,
    CellDefDirective,
    RowDefDirective,
    FooterCellDefDirective,
    FooterRowDefDirective,
    HeaderCellDirective,
    CellDirective,
    FooterCellDirective,
    HeaderRowComponent,
    RowComponent,
    FooterRowComponent
];

@NgModule({
    imports: [CdkTableModule, CommonModule, MatTableModule],
    exports: EXPORTED_DECLARATIONS,
    declarations: EXPORTED_DECLARATIONS
})
export class TableModule {}
