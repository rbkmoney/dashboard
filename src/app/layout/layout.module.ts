import { NgModule } from '@angular/core';

import { CardModule } from './card';
import { FloatPanelModule } from './float-panel';
import { JustifyWrapperModule } from './justify-wrapper';
import { HeadlineModule } from './headline';
import { PanelModule } from './panel';
import { TimelineModule } from './timeline';

const EXPORTED_IMPORTS = [
    CardModule,
    FloatPanelModule,
    JustifyWrapperModule,
    HeadlineModule,
    PanelModule,
    TimelineModule
];

@NgModule({
    imports: EXPORTED_IMPORTS,
    exports: EXPORTED_IMPORTS
})
export class LayoutModule {}
