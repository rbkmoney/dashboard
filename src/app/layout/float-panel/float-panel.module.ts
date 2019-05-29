import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FloatPanelComponent } from './float-panel.component';
import { CardModule } from '../card';

@NgModule({
    imports: [CardModule, MatIconModule, FlexLayoutModule],
    declarations: [FloatPanelComponent],
    exports: [FloatPanelComponent]
})
export class FloatPanelModule {}
