import { NgModule } from '@angular/core';

import { CardModule } from './card';
import { FloatPanelModule } from './float-panel';
import { JustifyWrapperModule } from './justify-wrapper';
import { HeadlineModule } from './headline';

const EXPORTED_IMPORTS = [CardModule, FloatPanelModule, JustifyWrapperModule, HeadlineModule];

@NgModule({
    imports: EXPORTED_IMPORTS,
    exports: EXPORTED_IMPORTS
})
export class LayoutModule {}
