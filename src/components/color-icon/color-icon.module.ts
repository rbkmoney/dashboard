import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ColorIconComponent } from '@dsh/components/color-icon/color-icon.component';

@NgModule({
    imports: [MatIconModule, CommonModule],
    declarations: [ColorIconComponent],
    exports: [ColorIconComponent],
})
export class ColorIconModule {}
