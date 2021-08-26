import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { NavbarItemConfig } from '@dsh/app/shared/components/route-navbar';

import { toNavbarItemConfig } from './utils';

@Component({
    templateUrl: 'wallet-section.component.html',
    styleUrls: ['wallet-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletSectionComponent {
    navbarItemConfig$: Observable<NavbarItemConfig[]> = this.transloco
        .selectTranslateObject<{ [k: string]: string }>('nav', {}, 'wallet-section')
        .pipe(map(toNavbarItemConfig));
    navbarMode$: Observable<'desktop' | 'mobile'> = this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(pluck('matches'))
        .pipe(map((isXSmallSmall) => (isXSmallSmall ? 'mobile' : 'desktop')));

    constructor(private transloco: TranslocoService, private breakpointObserver: BreakpointObserver) {}
}
