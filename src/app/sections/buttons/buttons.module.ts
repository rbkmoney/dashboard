import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonsComponent } from './buttons.component';
import { DshButtonModule } from '../../button';

@NgModule({
    declarations: [ButtonsComponent],
    imports: [FlexLayoutModule, DshButtonModule]
})
export class ButtonsModule {}
