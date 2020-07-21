import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ColoredIconComponent } from './colored-icon.component';

@NgModule({
    imports: [CommonModule, MatIconModule],
    declarations: [ColoredIconComponent],
    exports: [ColoredIconComponent],
})
export class ColoredIconModule {}
