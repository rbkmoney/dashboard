import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { ClaimsService, WalletService } from '../../api';
import { RouteEnv } from '../../sections/route-env';
import { Link, NavigationService } from '../../shared';
import { filterViewClaims } from '../../view-utils';
import { BrandType } from '../brand';

@Component({
    selector: 'dsh-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
    @Input() brandType: BrandType = BrandType.normal;

    links$ = combineLatest([
        this.navigationService.env$.pipe(
            startWith(RouteEnv.real),
            filter((e) => !!e)
        ),
        this.walletsService.hasWallets$,
    ]).pipe(
        map(
            ([env, hasWallets]) =>
                [
                    { id: 'main', path: '', activateStartPaths: [''] },
                    {
                        id: 'payments',
                        path: `payment-section/env/${env}/operations/payments`,
                        activateStartPaths: ['payment-section'],
                    },
                    {
                        id: 'wallets',
                        path: 'wallet-section/wallets',
                        activateStartPaths: ['wallet-section'],
                        disabled: !hasWallets,
                    },
                    { id: 'claims', path: 'claims', activateStartPaths: ['claims'] },
                ] as Link[]
        ),
        shareReplay(1)
    );
    active$ = this.links$.pipe(
        switchMap((links) => this.navigationService.findLinkWithMaxActivePaths(links)),
        shareReplay(1)
    );
    hideNav$ = combineLatest([this.links$, this.active$]).pipe(
        map(([links, active]) => active === links[0]),
        shareReplay(1)
    );

    claimsBadge$ = this.claimsService.searchClaims(100, ['pending', 'review', 'pendingAcceptance']).pipe(
        pluck('result'),
        map(filterViewClaims),
        map((claims) => claims.length || undefined),
        distinctUntilChanged(),
        shareReplay(1)
    );

    constructor(
        private walletsService: WalletService,
        private navigationService: NavigationService,
        private claimsService: ClaimsService
    ) {}
}
