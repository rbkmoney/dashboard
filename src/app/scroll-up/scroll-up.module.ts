import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';

import { ButtonModule } from '../button';
import { ScrollUpComponent } from './scroll-up.component';

@NgModule({
    imports: [MatIconModule, ButtonModule, CommonModule],
    declarations: [ScrollUpComponent],
    exports: [ScrollUpComponent]
})
export class ScrollUpModule {}
