import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

import { FloatPanelComponent } from './float-panel.component';
import { FloatPanelMoreTemplateComponent } from './templates/float-panel-more-template.component';
import { FloatPanelActionsTemplateComponent } from './templates/float-panel-actions-template.component';
import { ButtonModule } from '../../button';
import { ResizedModule } from '../../resized';
import { CardModule } from '../card';

const EXPORTED_DECLARATIONS = [
    FloatPanelComponent,
    FloatPanelMoreTemplateComponent,
    FloatPanelActionsTemplateComponent
];

@NgModule({
    imports: [MatIconModule, FlexLayoutModule, CommonModule, ButtonModule, ResizedModule, CardModule, TranslocoModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class FloatPanelModule {}
