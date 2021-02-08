import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { InlineShowAllToggleComponent } from './inline-show-all-toggle.component';

@NgModule({
    imports: [CommonModule, MatIconModule],
    declarations: [InlineShowAllToggleComponent],
    exports: [InlineShowAllToggleComponent],
})
export class InlineShowAllToggleModule {}
