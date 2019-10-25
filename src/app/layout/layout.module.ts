import { NgModule } from '@angular/core';

import { CardModule } from './card';
import { FloatPanelModule } from './float-panel';
import { JustifyWrapperModule } from './justify-wrapper';

const EXPORTED_IMPORTS = [CardModule, FloatPanelModule, JustifyWrapperModule];

@NgModule({
    imports: EXPORTED_IMPORTS,
    exports: EXPORTED_IMPORTS
})
export class LayoutModule {}
