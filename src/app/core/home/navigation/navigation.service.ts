import { Injectable } from '@angular/core';
import { Event, Router } from '@angular/router';
import cloneDeep from 'lodash.clonedeep';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';

import { WalletService } from '@dsh/api';
import { findActivePath } from '@dsh/app/shared/utils';

import { MENU_LINKS } from './consts';
import { NavigationLink } from './types/navigation-link';
import { NavigationSections } from './types/navigation-sections';

@Injectable()
export class NavigationService {
    availableLinks$: Observable<NavigationLink[]>;
    activeLink$: Observable<NavigationLink>;

    private currentUrl$: Observable<string> = this.router.events.pipe(
        startWith<Event, null>(null),
        map(() => this.router.url),
        distinctUntilChanged(),
        shareReplay(1)
    );

    private menuLinks: NavigationLink[] = cloneDeep(MENU_LINKS);

    constructor(private walletsService: WalletService, private router: Router) {
        this.initLinks();
        this.initActiveLink();
    }

    private initLinks(): void {
        this.availableLinks$ = this.walletsService.hasWallets$.pipe(
            map((hasWallets) => this.filterLinks(hasWallets)),
            shareReplay(1)
        );
    }

    private initActiveLink(): void {
        this.activeLink$ = combineLatest([this.currentUrl$, this.availableLinks$]).pipe(
            map(([url, links]) => findActivePath(url, links)),
            shareReplay(1)
        );
    }

    private filterLinks(hasWallets: boolean): NavigationLink[] {
        return this.menuLinks.filter(({ id }: NavigationLink) =>
            id === NavigationSections.wallets ? hasWallets : true
        );
    }
}
