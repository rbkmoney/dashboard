import { NgModule } from '@angular/core';
import { DshButtonToggleComponent, DshButtonToggleGroupDirective } from './button-toggle';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [DshButtonToggleGroupDirective, DshButtonToggleComponent],
    declarations: [DshButtonToggleGroupDirective, DshButtonToggleComponent]
})
export class DshButtonToggleModule {}
