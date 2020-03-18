import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ResizedModule } from '../../../app/resized';
import { ButtonModule } from '../../../components/buttons';
import { CardModule } from '../card';
import { FloatPanelComponent } from './float-panel.component';
import { FloatPanelActionsTemplateComponent } from './templates/float-panel-actions-template.component';
import { FloatPanelMoreTemplateComponent } from './templates/float-panel-more-template.component';

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
