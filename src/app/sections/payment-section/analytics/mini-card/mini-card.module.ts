import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CardModule } from '../../../../layout/card';
import { MiniCardComponent } from './mini-card.component';

@NgModule({
    imports: [CommonModule, CardModule, FlexLayoutModule],
    exports: [MiniCardComponent],
    declarations: [MiniCardComponent]
})
export class MiniCardModule {}
