import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ButtonsComponent } from './buttons.component';
import { ButtonModule } from '../../button';
import { CardModule } from '../../layout/card';
import { ButtonToggleModule } from '../../button-toggle';
import { MatIconModule } from '@angular/material';

@NgModule({
    declarations: [ButtonsComponent],
    imports: [FlexLayoutModule, ButtonModule, CardModule, ButtonToggleModule, MatIconModule]
})
export class ButtonsModule {}
