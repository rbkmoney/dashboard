import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';

import { FloatPanelComponent } from './float-panel.component';
import { CardModule } from '../card';
import { FloatPanelMoreComponent } from './float-panel-more/float-panel-more.component';
import { ElementRuler } from './element-ruler';

@NgModule({
    imports: [CardModule, MatIconModule, FlexLayoutModule, OverlayModule],
    declarations: [FloatPanelComponent, FloatPanelMoreComponent],
    exports: [FloatPanelComponent, FloatPanelMoreComponent],
    providers: [ElementRuler]
})
export class FloatPanelModule {}
