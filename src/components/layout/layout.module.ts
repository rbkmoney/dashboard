import { NgModule } from '@angular/core';

import { CardModule } from './card';
import { DetailsItemModule } from './details-item';
import { DropdownModule } from './dropdown';
import { ExpandPanelModule } from './expand-panel';
import { ExpansionModule } from './expansion';
import { FloatPanelModule } from './float-panel';
import { HeadlineModule } from './headline';
import { JustifyWrapperModule } from './justify-wrapper';
import { PanelModule } from './panel';
import { DshTabsModule } from './tabs';
import { TimelineModule } from './timeline';

const EXPORTED_MODULES = [
    CardModule,
    DropdownModule,
    ExpandPanelModule,
    FloatPanelModule,
    HeadlineModule,
    JustifyWrapperModule,
    PanelModule,
    DshTabsModule,
    TimelineModule,
    DetailsItemModule,
    ExpansionModule,
];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class LayoutModule {}
