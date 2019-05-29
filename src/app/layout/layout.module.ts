import { NgModule } from '@angular/core';

import { CardModule } from './card';
import { FloatPanelModule } from './float-panel';

@NgModule({
    imports: [CardModule, FloatPanelModule],
    exports: [CardModule, FloatPanelModule]
})
export class LayoutModule {}
