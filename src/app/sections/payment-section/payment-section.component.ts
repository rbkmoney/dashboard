import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';

import { PaymentInstitutionRealmService } from './services/payment-institution-realm/payment-institution-realm.service';
import { RealmShopsService } from './services/realm-shops/realm-shops.service';

@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['../main-sections.scss', 'payment-section.scss'],
    providers: [PaymentInstitutionRealmService, RealmShopsService],
})
export class PaymentSectionComponent {
    isTestRealm$ = this.realmService.realm$.pipe(map((realm) => realm === PaymentInstitution.RealmEnum.Test));

    constructor(private realmService: PaymentInstitutionRealmService) {}
}
