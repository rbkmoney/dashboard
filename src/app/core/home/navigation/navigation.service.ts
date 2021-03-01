import { Injectable } from '@angular/core';
import { Event, Router, UrlSegment } from '@angular/router';
import cloneDeep from 'lodash.clonedeep';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';

import { PaymentInstitutionRealm, WalletService } from '@dsh/api';

import { MENU_LINKS, REALM_TYPE, REALM_TYPE_POSITION, ROOT_ROUTE_PATH } from './consts';
import { NavigationLink } from './types/navigation-link';
import { NavigationSections } from './types/navigation-sections';
import { findActiveNavLink } from './utils/find-active-nav-link';

@Injectable()
export class NavigationService {
    availableLinks$: Observable<NavigationLink[]>;
    activeLink$: Observable<NavigationLink>;

    private menuLinks: NavigationLink[] = cloneDeep(MENU_LINKS);
    private currentUrl$: Observable<string> = this.router.events.pipe(
        startWith<Event, null>(null),
        map(() => this.router.url),
        distinctUntilChanged(),
        shareReplay(1)
    );

    private currentUrlSegments$: Observable<string[]> = this.currentUrl$.pipe(
        map((url: string) => {
            const urlRootChildren = this.router.parseUrl(url).root.children;
            return urlRootChildren.primary?.segments ?? [];
        }),
        map((segments: UrlSegment[]) => segments.map((segment: UrlSegment) => segment.path))
    );

    private realm$: Observable<PaymentInstitutionRealm> = this.currentUrlSegments$.pipe(
        map(
            (segments: string[]) =>
                (segments[REALM_TYPE_POSITION] as PaymentInstitutionRealm) ?? PaymentInstitutionRealm.live
        )
    );

    constructor(private walletsService: WalletService, private router: Router) {
        this.initLinks();
        this.initActiveLink();
        this.activeLink$.subscribe();
    }

    private initLinks(): void {
        this.availableLinks$ = combineLatest([this.walletsService.hasWallets$, this.realm$]).pipe(
            map(([hasWallets, realm]: [boolean, PaymentInstitutionRealm]) => {
                return [this.filterLinks(hasWallets), realm];
            }),
            map(([links, realm]: [NavigationLink[], PaymentInstitutionRealm]) => {
                return links.map((link: NavigationLink) => {
                    return {
                        ...link,
                        path: link.path.replace(REALM_TYPE, realm),
                    };
                });
            }),
            shareReplay(1)
        );
    }

    private initActiveLink(): void {
        this.activeLink$ = combineLatest([this.currentUrlSegments$, this.availableLinks$]).pipe(
            map(([segments, links]: [string[], NavigationLink[]]) => {
                // route link is active by default
                return (
                    findActiveNavLink(segments, links) ??
                    links.find((link: NavigationLink) => link.path === ROOT_ROUTE_PATH)
                );
            }),
            shareReplay(1)
        );
    }

    private filterLinks(hasWallets: boolean): NavigationLink[] {
        return this.menuLinks.filter(({ id }: NavigationLink) =>
            id === NavigationSections.wallets ? hasWallets : true
        );
    }
}
