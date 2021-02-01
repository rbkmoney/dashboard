import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { InlineShowAllComponent } from './inline-show-all.component';

@NgModule({
    imports: [CommonModule, MatIconModule],
    declarations: [InlineShowAllComponent],
    exports: [InlineShowAllComponent],
})
export class InlineShowAllModule {}
