import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { FloatPanelComponent } from './float-panel.component';
import { CardModule } from '../card';
import { FloatPanelMoreComponent } from './float-panel-more/float-panel-more.component';
import { FloatPanelService } from './float-panel.service';

@NgModule({
    imports: [CardModule, MatIconModule, FlexLayoutModule, CommonModule],
    declarations: [FloatPanelComponent, FloatPanelMoreComponent],
    exports: [FloatPanelComponent, FloatPanelMoreComponent]
})
export class FloatPanelModule {}
