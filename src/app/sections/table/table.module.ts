import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule, MatTableModule } from '@angular/material';

import { TableComponent } from './table.component';
import { DshTableModule } from '../../table';

@NgModule({
    declarations: [TableComponent],
    imports: [FlexLayoutModule, DshTableModule, MatTableModule, MatPaginatorModule]
})
export class TableModule {}
