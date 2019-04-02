import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainComponent } from './main.component';
import { BrandModule } from '../brand';
import { ToolbarModule } from '../toolbar';
import { ActionbarModule } from '../actionbar';
import { DshTableModule } from '../table';

@NgModule({
    declarations: [MainComponent],
    imports: [FlexLayoutModule, BrandModule, ToolbarModule, ActionbarModule, DshTableModule]
})
export class MainModule {}
