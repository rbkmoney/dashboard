import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { BootstrapIconModule, ResizedModule } from '@dsh/components/indicators';

import { ButtonModule } from '../../buttons';
import { CardModule } from '../card';
import { ExpandPanelAccordionComponent } from './expand-panel-accordion.component';
import { ExpandPanelMoreHeaderTemplateComponent, ExpandPanelMoreTemplateComponent } from './expand-panel-more';
import { ExpandPanelComponent } from './expand-panel.component';
import { LazyPanelContentDirective } from './lazy-panel-content.directive';

const EXPORTED_DECLARATIONS = [
    ExpandPanelComponent,
    ExpandPanelMoreTemplateComponent,
    ExpandPanelMoreHeaderTemplateComponent,
    ExpandPanelAccordionComponent,
    LazyPanelContentDirective,
];

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        ButtonModule,
        ResizedModule,
        CardModule,
        TranslocoModule,
        BootstrapIconModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class ExpandPanelModule {}
