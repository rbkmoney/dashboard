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
import { PaymentInstitutionRealmService } from './services/payment-institution-realm/payment-institution-realm.service';
import { PAYMENT_INSTITUTION_REALM_TOKEN } from './services/realm-shops';
import { TestEnvAlertModule } from './test-env-alert/test-env-alert.module';

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
        TestEnvAlertModule,
    ],
    declarations: [PaymentSectionComponent, NavComponent],
    exports: [PaymentSectionComponent],
    providers: [
        {
            provide: PAYMENT_INSTITUTION_REALM_TOKEN,
            deps: [PaymentInstitutionRealmService],
            useFactory: (realmService: PaymentInstitutionRealmService) => realmService.realm,
        },
    ],
})
export class PaymentSectionModule {}
