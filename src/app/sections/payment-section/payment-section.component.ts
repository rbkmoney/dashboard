import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { NavbarItemConfig } from '@dsh/app/shared/components/route-navbar';

import { PaymentInstitutionRealmService } from './services/payment-institution-realm/payment-institution-realm.service';
import { RealmShopsService } from './services/realm-shops/realm-shops.service';

@UntilDestroy()
@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['payment-section.scss'],
    providers: [PaymentInstitutionRealmService, RealmShopsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentSectionComponent {
    isTestRealm$ = this.realmService.realm$.pipe(map((realm) => realm === PaymentInstitution.RealmEnum.Test));
    navbarItemConfig$: Observable<NavbarItemConfig[]>;

    constructor(
        private realmService: PaymentInstitutionRealmService,
        private router: Router,
        private route: ActivatedRoute,
        private transloco: TranslocoService
    ) {
        this.realmService.realm$
            .pipe(
                filter((realm) => !realm),
                untilDestroyed(this)
            )
            .subscribe(
                () => void this.router.navigate(['realm', PaymentInstitution.RealmEnum.Live], { relativeTo: route })
            );

        this.navbarItemConfig$ = this.transloco
            .selectTranslateObject<{ [k: string]: string }>('nav', {}, 'payment-section')
            .pipe(
                map(({ analytics, integrations, operations, payouts, reports }) => [
                    {
                        routerLink: './analytics',
                        icon: 'pie_chart',
                        label: analytics,
                    },
                    {
                        routerLink: './operations',
                        icon: 'table_chart',
                        label: operations,
                    },
                    {
                        routerLink: './payouts',
                        icon: 'output',
                        label: payouts,
                    },
                    {
                        routerLink: './reports',
                        icon: 'description',
                        label: reports,
                    },
                    {
                        routerLink: './integrations',
                        icon: 'build',
                        label: integrations,
                    },
                ])
            );
    }
}
