import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NavbarItemConfig } from '@dsh/app/shared/components/route-navbar';

@Component({
    templateUrl: 'wallet-section.component.html',
    styleUrls: ['wallet-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletSectionComponent {
    navbarItemConfig$: Observable<NavbarItemConfig[]>;

    constructor(private transloco: TranslocoService) {
        this.navbarItemConfig$ = this.transloco
            .selectTranslateObject<{ [k: string]: string }>('nav', {}, 'wallet-section')
            .pipe(
                map(({ wallets, deposits, withdrawals, integrations }) => [
                    {
                        routerLink: './wallets',
                        icon: 'wallet_menu',
                        label: wallets,
                    },
                    {
                        routerLink: './deposits',
                        icon: 'input',
                        label: deposits,
                    },
                    {
                        routerLink: './withdrawals',
                        icon: 'output',
                        label: withdrawals,
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
