import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { ScrollUpComponent } from './scroll-up.component';
import { ButtonModule } from '../button';

@NgModule({
    imports: [MatIconModule, ButtonModule, CommonModule],
    declarations: [ScrollUpComponent],
    exports: [ScrollUpComponent]
})
export class ScrollUpModule {}
