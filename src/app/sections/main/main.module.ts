import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainComponent } from './main.component';
import { BrandModule } from '../../brand';
import { ToolbarModule } from '../../toolbar';
import { ActionbarModule } from '../../actionbar';
import { DocumentModule } from '../../document/document.module';
import { DshButtonModule } from '../../button';

@NgModule({
    declarations: [MainComponent],
    imports: [FlexLayoutModule, BrandModule, ToolbarModule, ActionbarModule, DocumentModule, DshButtonModule]
})
export class MainModule {}
