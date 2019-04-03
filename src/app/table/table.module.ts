import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TableComponent } from './table.component';
import { BrandModule } from '../brand';
import { ToolbarModule } from '../toolbar';
import { ActionbarModule } from '../actionbar';
import { DshTableModule } from '../components/table';

@NgModule({
    declarations: [TableComponent],
    imports: [FlexLayoutModule, MatSidenavModule, BrandModule, ToolbarModule, ActionbarModule, DshTableModule]
})
export class TableModule {}
