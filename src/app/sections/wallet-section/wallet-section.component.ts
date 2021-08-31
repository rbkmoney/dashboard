import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NavbarItemConfig, toNavbarItemConfig } from './utils';

@Component({
    templateUrl: 'wallet-section.component.html',
    styleUrls: ['wallet-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletSectionComponent {
    navbarItemConfig$: Observable<NavbarItemConfig[]> = this.transloco
        .selectTranslateObject<{ [k: string]: string }>('nav', {}, 'wallet-section')
        .pipe(map(toNavbarItemConfig));

    constructor(private transloco: TranslocoService) {}
}
