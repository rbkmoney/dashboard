import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';

import {
    PanelComponent,
    PanelContentComponent,
    PanelHeaderComponent,
    PanelHeaderIconComponent
} from './panel.component';

@NgModule({
    imports: [CommonModule, MatIconModule],
    declarations: [PanelComponent, PanelHeaderComponent, PanelContentComponent, PanelHeaderIconComponent],
    exports: [PanelComponent, PanelHeaderComponent, PanelContentComponent, PanelHeaderIconComponent]
})
export class PanelModule {}
