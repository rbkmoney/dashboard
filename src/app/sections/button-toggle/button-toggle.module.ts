import { NgModule } from '@angular/core';

import { ButtonToggleComponent } from './button-toggle.component';
import { DshButtonToggleModule } from '../../button-toggle';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [DshButtonToggleModule, MatIconModule, FlexLayoutModule],
    declarations: [ButtonToggleComponent]
})
export class ButtonToggleModule {}
