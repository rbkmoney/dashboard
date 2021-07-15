import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { PaymentSectionService } from './payment-section.service';
import { PaymentInstitutionRealmService } from './services/payment-institution-realm/payment-institution-realm.service';
import { RealmShopsService } from './services/realm-shops/realm-shops.service';
import { PaymentInstitution } from '@dsh/api-codegen/capi';


@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['../main-sections.scss', 'payment-section.scss'],
    providers: [PaymentSectionService, PaymentInstitutionRealmService, RealmShopsService],
})
export class PaymentSectionComponent {
    isTestRealm$ = this.paymentSectionService.realm$.pipe(map((realm) => realm === PaymentInstitution.RealmEnum.Test));

    constructor(private paymentSectionService: PaymentInstitutionRealmService) {}
}
