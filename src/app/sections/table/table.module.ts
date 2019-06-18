import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule, MatTableModule } from '@angular/material';

import { TableComponent } from './table.component';
import { DshTableModule } from '../../table';
import { CardModule } from '../../layout/card';
import { ButtonModule } from '../../button';

@NgModule({
    declarations: [TableComponent],
    imports: [FlexLayoutModule, DshTableModule, MatTableModule, MatPaginatorModule, CardModule, ButtonModule]
})
export class TableModule {}
