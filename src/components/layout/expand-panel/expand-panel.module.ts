import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ResizedModule } from '../../../app/resized';
import { ButtonModule } from '../../../components/buttons';
import { CardModule } from '../card';
import { ExpandPanelMoreTemplateComponent } from './expand-panel-more-template.component';
import { ExpandPanelComponent } from './expand-panel.component';

const EXPORTED_DECLARATIONS = [ExpandPanelComponent, ExpandPanelMoreTemplateComponent];

@NgModule({
    imports: [MatIconModule, FlexLayoutModule, CommonModule, ButtonModule, ResizedModule, CardModule, TranslocoModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class ExpandPanelModule {}
