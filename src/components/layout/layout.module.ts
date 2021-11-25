import { NgModule } from '@angular/core';

import { AccordionModule } from './accordion';
import { CardModule } from './card';
import { CollapseModule } from './collapse';
import { DetailsItemModule } from './details-item';
import { DropdownModule } from './dropdown';
import { LimitedListModule } from './limited-list';
import { LinkLabelModule } from './link-label';
import { PanelModule } from './panel';
import { RowModule } from './row';
import { TimelineModule } from './timeline';

const EXPORTED_MODULES = [
    CardModule,
    DropdownModule,
    PanelModule,
    TimelineModule,
    DetailsItemModule,
    RowModule,
    AccordionModule,
    LinkLabelModule,
    LimitedListModule,
    CollapseModule,
];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class LayoutModule {}
