import { NgModule } from '@angular/core';

import { RowComponent, RowHeaderLabelComponent, RowLabelComponent } from './row.component';

@NgModule({
    declarations: [RowComponent, RowHeaderLabelComponent, RowLabelComponent],
    exports: [RowComponent, RowHeaderLabelComponent, RowLabelComponent],
})
export class RowModule {}
