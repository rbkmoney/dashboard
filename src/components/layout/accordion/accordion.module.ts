import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from '@angular/material/icon';

import { ButtonModule } from '../../buttons';
import { ResizedModule } from '../../indicators';
import { AccordionItemComponent } from './accordion-item';
import { AccordionItemActionsComponent } from "./accordion-item-actions";
import { AccordionItemContentComponent } from './accordion-item-content';
import { AccordionItemContentHeaderComponent } from './accordion-item-content-header';
import { AccordionComponent } from './accordion.component';

const EXPORTED_DECLARATIONS = [
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemContentHeaderComponent,
    AccordionItemContentComponent,
    AccordionItemActionsComponent,
];

@NgModule({
    imports: [CommonModule, ResizedModule, MatIconModule, FlexLayoutModule, ButtonModule, MatDividerModule],
    declarations: [EXPORTED_DECLARATIONS, AccordionItemActionsComponent],
    exports: [EXPORTED_DECLARATIONS, AccordionItemActionsComponent],
})
export class AccordionModule {}
