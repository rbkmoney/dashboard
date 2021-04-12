import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { ThemeManager } from '../theme-manager';
import { ROOT_ROUTE_PATH } from './navigation/consts';

@UntilDestroy()
@Component({
    selector: 'dsh-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
    routerNavigationEnd$: Observable<boolean>;
    isMobileScreen$ = new BehaviorSubject<boolean>(true);

    constructor(
        private router: Router,
        // need to create class when home component was init
        private themeManager: ThemeManager,
        breakpointObserver: BreakpointObserver
    ) {
        breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe((result) => {
            if (result.matches) {
                this.isMobileScreen$.next(true);
            } else {
                this.isMobileScreen$.next(false);
            }
        });
    }

    get hasBackground(): boolean {
        return this.router.url === ROOT_ROUTE_PATH && this.themeManager.isMainBackgroundImages;
    }

    get logoName(): string {
        return this.themeManager.logoName;
    }

    ngOnInit(): void {
        this.routerNavigationEnd$ = this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd),
            map(() => true),
            take(1),
            untilDestroyed(this)
        );
    }
}
