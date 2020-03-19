import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';

import { ActiveClassModule } from '../../utils/active-class/active-class.module';
import { ResizedModule } from '../resized';
import { ExpandPanelContentComponent } from './expand-panel-content.component';
import { ExpandPanelComponent } from './expand-panel.component';

const EXPORTED_DECLARATIONS = [ExpandPanelComponent, ExpandPanelContentComponent];

@NgModule({
    imports: [CommonModule, MatIconModule, FlexLayoutModule, ResizedModule, ActiveClassModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class ExpandPanelModule {}
