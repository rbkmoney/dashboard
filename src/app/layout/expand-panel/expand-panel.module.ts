import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { ExpandPanelComponent } from './expand-panel.component';
import { ExpandPanelMoreTemplateComponent } from './expand-panel-more-template.component';
import { ButtonModule } from '../../button';
import { ResizedModule } from '../../resized';
import { CardModule } from '../card';

const EXPORTED_DECLARATIONS = [ExpandPanelComponent, ExpandPanelMoreTemplateComponent];

@NgModule({
    imports: [MatIconModule, FlexLayoutModule, CommonModule, ButtonModule, ResizedModule, CardModule, TranslocoModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class ExpandPanelModule {}
