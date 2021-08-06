import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';

import { PaymentInstitutionRealmService } from './services/payment-institution-realm/payment-institution-realm.service';
import { RealmShopsService } from './services/realm-shops/realm-shops.service';

@UntilDestroy()
@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['../main-sections.scss', 'payment-section.scss'],
    providers: [PaymentInstitutionRealmService, RealmShopsService],
})
export class PaymentSectionComponent {
    isTestRealm$ = this.realmService.realm$.pipe(map((realm) => realm === PaymentInstitution.RealmEnum.Test));

    constructor(
        private realmService: PaymentInstitutionRealmService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.realmService.realm$
            .pipe(
                filter((realm) => !realm),
                untilDestroyed(this)
            )
            .subscribe(
                () => void this.router.navigate(['realm', PaymentInstitution.RealmEnum.Live], { relativeTo: route })
            );
    }
}
