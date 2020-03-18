import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';

import { StateNavModule } from '../../state-nav';
import { NavComponent } from './nav';
import { PaymentSectionRoutingModule } from './payment-section-routing.module';
import { NavComponent } from './nav';
import { StateNavModule } from '../../state-nav';
import { BalancesComponent, BalanceItemComponent } from './nav/balances';
import { PaymentSectionComponent } from './payment-section.component';

@NgModule({
    imports: [
        CommonModule,
        PaymentSectionRoutingModule,
        StateNavModule,
        MatIconModule,
        FlexLayoutModule,
        TranslocoModule
    ],
    declarations: [PaymentSectionComponent, NavComponent, BalancesComponent, BalanceItemComponent],
    exports: [PaymentSectionComponent]
})
export class PaymentSectionModule {}
