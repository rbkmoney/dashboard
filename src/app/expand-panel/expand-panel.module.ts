import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExpandPanelComponent } from './expand-panel.component';
import { ExpandPanelContentComponent } from './expand-panel-content.component';
import { ResizedModule } from '../resized';
import { ActiveClassModule } from '../../utils/active-class/active-class.module';

@NgModule({
    imports: [CommonModule, MatIconModule, FlexLayoutModule, ResizedModule, ActiveClassModule],
    declarations: [ExpandPanelComponent, ExpandPanelContentComponent],
    exports: [ExpandPanelComponent, ExpandPanelContentComponent]
})
export class ExpandPanelModule {}
