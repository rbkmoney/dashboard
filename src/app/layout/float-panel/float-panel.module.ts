import { NgModule } from '@angular/core';

import { FloatPanelComponent } from './float-panel.component';
import { CardModule } from '../card';

@NgModule({
    imports: [CardModule],
    declarations: [FloatPanelComponent],
    exports: [FloatPanelComponent]
})
export class FloatPanelModule {}
