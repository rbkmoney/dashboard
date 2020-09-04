import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { NavbarModule, StateNavModule } from '@dsh/components/navigation';

import { BalancesModule } from './balances';
import { NavComponent } from './nav';
import { PaymentSectionRoutingModule } from './payment-section-routing.module';
import { PaymentSectionComponent } from './payment-section.component';
import { TestEnvBannerModule } from './test-env-banner/test-env-banner.module';

@NgModule({
    imports: [
        CommonModule,
        PaymentSectionRoutingModule,
        StateNavModule,
        MatIconModule,
        FlexLayoutModule,
        TranslocoModule,
        NavbarModule,
        BalancesModule,
        TestEnvBannerModule,
    ],
    declarations: [PaymentSectionComponent, NavComponent],
    exports: [PaymentSectionComponent],
})
export class PaymentSectionModule {}
