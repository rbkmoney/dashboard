import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { FloatPanelComponent } from './float-panel.component';
import { CardModule } from '../card';
import { FloatPanelMoreComponent } from './float-panel-more.component';
import { FloatPanelActionsComponent } from './float-panel-actions.component';
import { ElementRuler } from './element-ruler';
import { DshButtonModule } from '../../button';

@NgModule({
    imports: [CardModule, MatIconModule, FlexLayoutModule, CommonModule, DshButtonModule, OverlayModule],
    declarations: [FloatPanelComponent, FloatPanelMoreComponent, FloatPanelActionsComponent],
    exports: [FloatPanelComponent, FloatPanelMoreComponent, FloatPanelActionsComponent],
    providers: [ElementRuler]
})
export class FloatPanelModule {}
