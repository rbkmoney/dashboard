import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListLabelPipe } from './list-label.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [ListLabelPipe],
    exports: [ListLabelPipe],
})
export class ListLabelModule {}
