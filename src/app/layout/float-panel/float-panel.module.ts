import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { FloatPanelComponent } from './float-panel.component';
import { CardModule } from '../card';
import { FloatPanelMoreTemplateComponent } from './templates/float-panel-more-template.component';
import { FloatPanelActionsTemplateComponent } from './templates/float-panel-actions-template.component';
import { ElementRuler } from './element-ruler';
import { ButtonModule } from '../../button';

@NgModule({
    imports: [CardModule, MatIconModule, FlexLayoutModule, CommonModule, ButtonModule, OverlayModule],
    declarations: [FloatPanelComponent, FloatPanelMoreTemplateComponent, FloatPanelActionsTemplateComponent],
    exports: [FloatPanelComponent, FloatPanelMoreTemplateComponent, FloatPanelActionsTemplateComponent],
    providers: [ElementRuler]
})
export class FloatPanelModule {}
