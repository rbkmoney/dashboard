import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonsComponent } from './buttons.component';
import { ButtonModule } from '../../button';
import { CardModule } from '../../layout/card';
import { DshButtonToggleModule } from '../../button-toggle';

@NgModule({
    declarations: [ButtonsComponent],
    imports: [FlexLayoutModule, ButtonModule, CardModule, DshButtonToggleModule]
})
export class ButtonsModule {}
