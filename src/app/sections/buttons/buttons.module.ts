import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonsComponent } from './buttons.component';
import { DshButtonModule } from '../../button';
import { CardModule } from '../../layout/card';

@NgModule({
    declarations: [ButtonsComponent],
    imports: [FlexLayoutModule, DshButtonModule, CardModule]
})
export class ButtonsModule {}
