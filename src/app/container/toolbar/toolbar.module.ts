import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ToolbarComponent } from './toolbar.component';
import { BrandModule } from '../brand/brand.module';
import { ActionbarModule } from '../actionbar/actionbar.module';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [CommonModule, FlexLayoutModule, BrandModule, ActionbarModule],
    exports: [ToolbarComponent]
})
export class ToolbarModule {}
