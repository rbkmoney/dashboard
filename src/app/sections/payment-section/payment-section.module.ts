import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { RouteNavbarModule } from '@dsh/app/shared/components/route-navbar';

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
        RouteNavbarModule,
    ],
    declarations: [PaymentSectionComponent],
    exports: [PaymentSectionComponent],
})
export class PaymentSectionModule {}
