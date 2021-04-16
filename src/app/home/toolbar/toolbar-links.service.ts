import { Injectable } from '@angular/core';
import { Event, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';

import { PaymentInstitutionRealm } from '@dsh/api/model';
import { WalletService } from '@dsh/api/wallet';
import { Link } from '@dsh/app/shared';
import { findActivePath } from '@dsh/app/shared/utils';

export interface ToolbarLink extends Link {
    id: string;
    hidden?: boolean;
}

export enum LinkId {
    Main = 'main',
    Payments = 'payments',
    Wallets = 'wallets',
    Claims = 'claims',
}

@Injectable()
export class ToolbarLinksService {
    private url$ = this.router.events.pipe(
        startWith<Event, null>(null),
        map(() => this.router.url),
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
            {
                id: LinkId.Main,
                path: '/',
            },
            {
                id: LinkId.Payments,
                path: `/payment-section/realm/${PaymentInstitutionRealm.Live}/operations/payments`,
                activateStartPaths: ['/payment-section', '/invoice'],
            },
            {
                id: LinkId.Wallets,
                path: '/wallet-section/wallets',
                activateStartPaths: ['/wallet-section', '/wallet'],
                hidden: !hasWallets,
            },
            { id: LinkId.Claims, path: '/claims', activateStartPaths: ['/claims', '/claim', '/onboarding'] },
        ];
    }
}
