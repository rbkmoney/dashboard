import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { SHOPS } from '@dsh/app/shared/components/inputs/shop-field';

import { PaymentInstitutionRealmService, RealmShopsService } from './services';
import { NavbarItemConfig, toNavbarItemConfig } from './utils';

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

    private activeSectionChange$ = new Subject<string>();
    private realmChange$ = new Subject<PaymentInstitution.RealmEnum>();

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

        combineLatest([this.activeSectionChange$, this.realmChange$])
            .pipe(untilDestroyed(this))
            .subscribe(
                ([activeSection, realm]) =>
                    void this.router.navigate(['../../', 'realm', realm, activeSection], {
                        relativeTo: this.route,
                        queryParamsHandling: 'preserve',
                    })
            );
    }

    setActiveSection(isActive: boolean, section: string): void {
        if (!isActive) {
            return;
        }
        this.activeSectionChange$.next(section);
    }

    testEnvToggle(isTestEnv: boolean): void {
        const realm = isTestEnv ? PaymentInstitution.RealmEnum.Test : PaymentInstitution.RealmEnum.Live;
        this.realmChange$.next(realm);
    }
}
