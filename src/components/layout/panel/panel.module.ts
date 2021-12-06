import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BootstrapIconModule } from '@dsh/components/indicators';

import {
    PanelComponent,
    PanelContentComponent,
    PanelHeaderComponent,
    PanelHeaderIconComponent,
} from './panel.component';

@NgModule({
    imports: [CommonModule, BootstrapIconModule],
    declarations: [PanelComponent, PanelHeaderComponent, PanelContentComponent, PanelHeaderIconComponent],
    exports: [PanelComponent, PanelHeaderComponent, PanelContentComponent, PanelHeaderIconComponent],
})
export class PanelModule {}
