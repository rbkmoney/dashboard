import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToolbarModule } from '../toolbar';
import { LaptopGridComponent } from './laptop-grid.component';

@NgModule({
    imports: [CommonModule, ToolbarModule],
    declarations: [LaptopGridComponent],
    exports: [LaptopGridComponent],
})
export class LaptopGridModule {}
