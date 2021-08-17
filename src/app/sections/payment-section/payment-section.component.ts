import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { SHOPS } from '@dsh/app/shared/components/inputs/shop-field';
import { NavbarItemConfig } from '@dsh/app/shared/components/route-navbar';

import { PaymentInstitutionRealmService } from './services/payment-institution-realm/payment-institution-realm.service';
import { RealmShopsService } from './services/realm-shops/realm-shops.service';
import { toNavbarItemConfig } from './utils';

@UntilDestroy()
@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['payment-section.scss'],
    providers: [
        PaymentInstitutionRealmService,
        RealmShopsService,
        {
            provide: SHOPS,
            deps: [RealmShopsService],
            useFactory: (realmShopsService: RealmShopsService) => realmShopsService.shops$,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentSectionComponent implements OnInit {
    isTestRealm$ = this.realmService.realm$.pipe(map((realm) => realm === PaymentInstitution.RealmEnum.Test));
    navbarItemConfig$: Observable<NavbarItemConfig[]> = this.transloco
        .selectTranslateObject<{ [k: string]: string }>('nav', {}, 'payment-section')
        .pipe(map(toNavbarItemConfig));

    constructor(
        private realmService: PaymentInstitutionRealmService,
        private router: Router,
        private route: ActivatedRoute,
        private transloco: TranslocoService
    ) {}

    ngOnInit(): void {
        this.realmService.realm$
            .pipe(
                filter((realm) => !realm),
                untilDestroyed(this)
            )
            .subscribe(
                () =>
                    void this.router.navigate(['realm', PaymentInstitution.RealmEnum.Live], { relativeTo: this.route })
            );
    }
}
