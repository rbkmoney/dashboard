import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonToggleComponent, ButtonToggleGroupDirective } from './button-toggle.component';

const EXPORTED_DECLARATIONS = [ButtonToggleGroupDirective, ButtonToggleComponent];

@NgModule({
    imports: [CommonModule],
    exports: EXPORTED_DECLARATIONS,
    declarations: EXPORTED_DECLARATIONS
})
export class ButtonToggleModule {}
