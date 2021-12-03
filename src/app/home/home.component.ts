import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { pluck, filter, map, startWith, distinctUntilChanged } from 'rxjs/operators';

import { shareReplayRefCount } from '@dsh/operators';

import { ThemeManager } from '../theme-manager';

@UntilDestroy()
@Component({
    selector: 'dsh-home',
    templateUrl: 'home.component.html',
})
export class HomeComponent {
    isXSmallSmall$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(pluck('matches'));
    hasBackground$ = this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        map(() => /^\/organization\/[\w-]+$/.test(this.router.url) && this.themeManager.isMainBackgroundImages),
        distinctUntilChanged(),
        shareReplayRefCount()
    );

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        // need to create class when home component was init
        private themeManager: ThemeManager,
        private breakpointObserver: BreakpointObserver
    ) {}

    get logoName(): string {
        return this.themeManager.logoName;
    }
}
