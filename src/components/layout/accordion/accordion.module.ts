import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

import { BootstrapIconModule, ResizedModule } from '@dsh/components/indicators';

import { ButtonModule } from '../../buttons';
import { AccordionItemComponent, LazyPanelContentDirective } from './accordion-item';
import { AccordionItemContentComponent } from './accordion-item-content';
import { AccordionItemContentHeaderComponent } from './accordion-item-content-header';
import { AccordionComponent } from './accordion.component';

const EXPORTED_DECLARATIONS = [
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemContentHeaderComponent,
    AccordionItemContentComponent,
    LazyPanelContentDirective,
];

@NgModule({
    imports: [CommonModule, ResizedModule, FlexLayoutModule, ButtonModule, MatDividerModule, BootstrapIconModule],
    declarations: [EXPORTED_DECLARATIONS],
    exports: [EXPORTED_DECLARATIONS],
})
export class AccordionModule {}
