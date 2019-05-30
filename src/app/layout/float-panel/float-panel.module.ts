import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { FloatPanelComponent } from './float-panel.component';
import { CardModule } from '../card';
import { FloatPanelMoreComponent } from './float-panel-more.component';
import { FloatPanelActionsComponent } from './float-panel-actions.component';

@NgModule({
    imports: [CardModule, MatIconModule, FlexLayoutModule, CommonModule],
    declarations: [FloatPanelComponent, FloatPanelMoreComponent, FloatPanelActionsComponent],
    exports: [FloatPanelComponent, FloatPanelMoreComponent, FloatPanelActionsComponent]
})
export class FloatPanelModule {}
