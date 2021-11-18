import { NgModule } from '@angular/core';

import { AccordionModule } from './accordion';
import { CardModule } from './card';
import { CollapseModule } from './collapse';
import { DetailsItemModule } from './details-item';
import { DropdownModule } from './dropdown';
import { ExpandPanelModule } from './expand-panel';
import { FloatPanelModule } from './float-panel';
import { HeadlineModule } from './headline';
import { JustifyWrapperModule } from './justify-wrapper';
import { LimitedListModule } from './limited-list';
import { LinkLabelModule } from './link-label';
import { PanelModule } from './panel';
import { RowModule } from './row';
import { TimelineModule } from './timeline';

const EXPORTED_MODULES = [
    CardModule,
    DropdownModule,
    ExpandPanelModule,
    FloatPanelModule,
    HeadlineModule,
    JustifyWrapperModule,
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
