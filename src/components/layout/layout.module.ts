import { NgModule } from '@angular/core';

import { CardModule } from './card';
import { ExpandPanelModule } from './expand-panel';
import { FloatPanelModule } from './float-panel';
import { HeadlineModule } from './headline';
import { JustifyWrapperModule } from './justify-wrapper';
import { PanelModule } from './panel';
import { TimelineModule } from './timeline';

const EXPORTED_IMPORTS = [
    CardModule,
    FloatPanelModule,
    JustifyWrapperModule,
    HeadlineModule,
    PanelModule,
    TimelineModule,
    ExpandPanelModule
];

@NgModule({
    imports: EXPORTED_IMPORTS,
    exports: EXPORTED_IMPORTS
})
export class LayoutModule {}
