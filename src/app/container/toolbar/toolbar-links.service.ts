import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { WalletService } from '../../api';
import { RouteEnv } from '../../sections/route-env';
import { Link, NavigationService } from '../../shared';

@Injectable()
export class ToolbarLinksService {
    links$ = combineLatest([
        this.navigationService.env$.pipe(
            startWith(RouteEnv.real),
            filter((e) => !!e)
        ),
        this.walletsService.hasWallets$,
    ]).pipe(
        map(([env, hasWallets]) => this.createLinks(env as RouteEnv, hasWallets)),
        shareReplay(1)
    );
    active$ = this.links$.pipe(
        switchMap((links) => this.navigationService.findLinkWithMaxActivePaths(links)),
        shareReplay(1)
    );

    constructor(private walletsService: WalletService, private navigationService: NavigationService) {}

    private createLinks(env: RouteEnv, hasWallets: boolean): Link[] {
        return [
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
        ];
    }
}
