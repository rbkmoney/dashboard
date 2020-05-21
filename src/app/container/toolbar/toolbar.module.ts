import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ActionbarModule } from '../actionbar/actionbar.module';
import { BrandModule } from '../brand/brand.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [CommonModule, FlexLayoutModule, BrandModule, ActionbarModule],
    exports: [ToolbarComponent],
})
export class ToolbarModule {}
