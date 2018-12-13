import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainComponent } from './main.component';
import { BrandModule } from '../brand';
import { ToolbarModule } from '../toolbar';
import { ActionbarModule } from '../actionbar';

@NgModule({
    declarations: [MainComponent],
    imports: [FlexLayoutModule, BrandModule, ToolbarModule, ActionbarModule]
})
export class MainModule {}
