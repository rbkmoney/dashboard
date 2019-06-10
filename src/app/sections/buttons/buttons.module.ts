import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonsComponent } from './buttons.component';
import { ButtonModule } from '../../button';
import { CardModule } from '../../layout/card';

@NgModule({
    declarations: [ButtonsComponent],
    imports: [FlexLayoutModule, ButtonModule, CardModule]
})
export class ButtonsModule {}
