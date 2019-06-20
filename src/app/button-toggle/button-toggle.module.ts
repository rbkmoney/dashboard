import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DshButtonToggleComponent, DshButtonToggleGroupDirective } from './button-toggle.component';

@NgModule({
    imports: [CommonModule],
    exports: [DshButtonToggleGroupDirective, DshButtonToggleComponent],
    declarations: [DshButtonToggleGroupDirective, DshButtonToggleComponent]
})
export class DshButtonToggleModule {}
