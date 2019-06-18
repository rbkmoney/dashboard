import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';

import { MainComponent } from './main.component';
import { WalletsComponent } from './widgets/wallets/wallets.component';
import { ButtonModule } from '../../button';
import { PaymentsComponent } from './widgets/payments/payments.component';

@NgModule({
    imports: [FlexLayoutModule, RouterModule, MatIconModule, ButtonModule],
    declarations: [MainComponent, WalletsComponent, PaymentsComponent]
})
export class MainModule {}
