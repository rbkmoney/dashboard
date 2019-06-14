import { NgModule } from '@angular/core';

import { CardModule } from './card';
import { FloatPanelModule } from './float-panel';
import { JustifyWrapperModule } from './justify-wrapper';

@NgModule({
    imports: [CardModule, FloatPanelModule, JustifyWrapperModule],
    exports: [CardModule, FloatPanelModule, JustifyWrapperModule]
})
export class LayoutModule {}
