import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { CollapseComponent } from './collapse.component';

@NgModule({
    imports: [CommonModule, MatIconModule, FlexLayoutModule],
    declarations: [CollapseComponent],
    exports: [CollapseComponent],
})
export class CollapseModule {}
