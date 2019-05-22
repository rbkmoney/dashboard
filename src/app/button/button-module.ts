import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DshButtonComponent } from './button';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        DshButtonComponent
    ],
    declarations: [
        DshButtonComponent
    ]
})
export class DshButtonModule {
}
