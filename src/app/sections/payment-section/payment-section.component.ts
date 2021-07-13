import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';

import { PaymentInstitutionRealmService } from './services/payment-institution-realm/payment-institution-realm.service';

@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['../main-sections.scss', 'payment-section.scss'],
    providers: [PaymentInstitutionRealmService],
})
export class PaymentSectionComponent {
    isTestRealm$ = this.paymentSectionService.realm$.pipe(map((realm) => realm === PaymentInstitution.RealmEnum.Test));

    constructor(private paymentSectionService: PaymentInstitutionRealmService) {}
}
