import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsItemComponent } from './details-item.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DetailsItemComponent],
    exports: [DetailsItemComponent]
})
export class DetailsItemModule {}
