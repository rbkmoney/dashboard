import { NgModule } from '@angular/core';

import { CardModule } from './card';
import { DropdownModule } from './dropdown';
import { ExpandPanelModule } from './expand-panel';
import { FloatPanelModule } from './float-panel';
import { HeadlineModule } from './headline';
import { JustifyWrapperModule } from './justify-wrapper';
import { PanelModule } from './panel';
import { DshTabsModule } from './tabs';
import { TimelineModule } from './timeline';

const EXPORTED_IMPORTS = [
    CardModule,
    DropdownModule,
    ExpandPanelModule,
    FloatPanelModule,
    HeadlineModule,
    JustifyWrapperModule,
    PanelModule,
    DshTabsModule,
    TimelineModule
];

@NgModule({
    imports: EXPORTED_IMPORTS,
    exports: EXPORTED_IMPORTS
})
export class LayoutModule {}
