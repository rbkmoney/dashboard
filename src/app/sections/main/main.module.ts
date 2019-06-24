import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';

import { MainComponent } from './main.component';
import { ButtonModule } from '../../button';

import { PaymentsComponent as PaymentsPartComponent } from './parts';
import { WalletsComponent as WalletsPartComponent } from './parts';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, RouterModule, MatIconModule, ButtonModule],
    declarations: [MainComponent, PaymentsPartComponent, WalletsPartComponent]
})
export class MainModule {}
