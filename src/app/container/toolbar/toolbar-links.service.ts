import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';

import { PaymentInstitutionRealm, WalletService } from '../../api';
import { Link } from '../../shared';
import { findActivePath } from '../../shared/utils';

export interface ToolbarLink extends Link {
    id: string;
    hidden?: boolean;
}

export enum LinkId {
    main = 'main',
    payments = 'payments',
    wallets = 'wallets',
    claims = 'claims',
}

@Injectable()
export class ToolbarLinksService {
    private url$ = this.router.events.pipe(
        startWith(null),
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
            { id: LinkId.main, path: '', activateStartPaths: [''] },
            {
                id: LinkId.payments,
                path: `payment-section/realm/${PaymentInstitutionRealm.live}/operations/payments`,
                activateStartPaths: ['/payment-section', '/invoice'],
            },
            {
                id: LinkId.wallets,
                path: 'wallet-section/wallets',
                activateStartPaths: ['/wallet-section', '/wallet'],
                hidden: !hasWallets,
            },
            { id: LinkId.claims, path: 'claims', activateStartPaths: ['/claims', '/claim', '/onboarding'] },
        ];
    }
}
