import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonToggleComponent, ButtonToggleGroupDirective } from './button-toggle.component';

@NgModule({
    imports: [CommonModule],
    exports: [ButtonToggleGroupDirective, ButtonToggleComponent],
    declarations: [ButtonToggleGroupDirective, ButtonToggleComponent]
})
export class ButtonToggleModule {}
