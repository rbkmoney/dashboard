import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailsItemComponent } from './details-item.component';

@NgModule({
    declarations: [DetailsItemComponent],
    exports: [DetailsItemComponent],
})
export class DetailsItemModule {}
