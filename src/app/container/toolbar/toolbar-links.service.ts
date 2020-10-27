import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';

import { WalletService } from '../../api';
import { RouteEnv } from '../../sections/route-env';
import { Link } from '../../shared';
import { findActivePath } from '../../shared/utils';

export interface ToolbarLink extends Link {
    id: string;
    hidden?: boolean;
}

@Injectable()
export class ToolbarLinksService {
    private url$ = this.router.events.pipe(
        startWith(null),
        map(() => (this.router.url || '').slice(1)),
        distinctUntilChanged(),
        shareReplay(1)
    );
    links$ = this.walletsService.hasWallets$.pipe(
        map((hasWallets) => this.createLinks(hasWallets)),
        shareReplay(1)
    );
    active$ = combineLatest([this.url$, this.links$]).pipe(
        map(([url, links]) => findActivePath(url, links)),
        shareReplay(1)
    );

    constructor(private walletsService: WalletService, private router: Router) {}

    private createLinks(hasWallets: boolean): ToolbarLink[] {
        return [
            { id: 'main', path: '', activateStartPaths: [''] },
            {
                id: 'payments',
                path: `payment-section/env/${RouteEnv.real}/operations/payments`,
                activateStartPaths: ['payment-section'],
            },
            {
                id: 'wallets',
                path: 'wallet-section/wallets',
                activateStartPaths: ['wallet-section'],
                hidden: !hasWallets,
            },
            { id: 'claims', path: 'claims', activateStartPaths: ['claims'] },
        ];
    }
}
