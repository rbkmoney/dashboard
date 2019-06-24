import { NgModule } from '@angular/core';
import { ButtonToggleComponent, ButtonToggleGroupDirective } from './button-toggle.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [ButtonToggleGroupDirective, ButtonToggleComponent],
    declarations: [ButtonToggleGroupDirective, ButtonToggleComponent]
})
export class ButtonToggleModule {}
