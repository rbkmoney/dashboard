import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { FloatPanelComponent } from './float-panel.component';
import { FloatPanelMoreTemplateComponent } from './templates/float-panel-more-template.component';
import { FloatPanelActionsTemplateComponent } from './templates/float-panel-actions-template.component';
import { ButtonModule } from '../../button';
import { ResizedModule } from '../../resized';

@NgModule({
    imports: [MatIconModule, FlexLayoutModule, CommonModule, ButtonModule, OverlayModule, ResizedModule],
    declarations: [FloatPanelComponent, FloatPanelMoreTemplateComponent, FloatPanelActionsTemplateComponent],
    exports: [FloatPanelComponent, FloatPanelMoreTemplateComponent, FloatPanelActionsTemplateComponent]
})
export class FloatPanelModule {}
