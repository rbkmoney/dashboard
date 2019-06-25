import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { MainComponent } from './main.component';
import { ButtonModule } from '../../button';
import { LocaleModule } from '../../locale';
import { PaymentsComponent } from './parts';
import { WalletsComponent } from './parts';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, RouterModule, MatIconModule, ButtonModule, LocaleModule],
    declarations: [MainComponent, PaymentsComponent, WalletsComponent]
})
export class MainModule {}
