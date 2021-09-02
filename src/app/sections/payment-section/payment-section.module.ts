import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { RouteNavbarLayoutModule } from '@dsh/app/shared/components/route-navbar-layout';
import { NavbarItemModule } from '@dsh/components/navigation';

import { BalancesModule } from './balances';
import { PaymentSectionRoutingModule } from './payment-section-routing.module';
import { PaymentSectionComponent } from './payment-section.component';
import { TestEnvAlertModule } from './test-env-alert/test-env-alert.module';

@NgModule({
    imports: [
        CommonModule,
        PaymentSectionRoutingModule,
        MatIconModule,
        FlexLayoutModule,
        TranslocoModule,
        BalancesModule,
        TestEnvAlertModule,
        RouteNavbarLayoutModule,
        NavbarItemModule,
    ],
    declarations: [PaymentSectionComponent],
    exports: [PaymentSectionComponent],
})
export class PaymentSectionModule {}
