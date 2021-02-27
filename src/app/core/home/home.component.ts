import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { ThemeManager } from '../../theme-manager';
import { ScreenSize } from '../services/screen-size-control/interfaces/screen-size';
import { ScreenSizeControlService } from '../services/screen-size-control/screen-size-control.service';
import { BrandType } from './brand';

@UntilDestroy()
@Component({
    selector: 'dsh-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
    routerNavigationEnd$: Observable<boolean>;
    isMobileScreen$: Observable<boolean>;

    constructor(
        private screenSizeController: ScreenSizeControlService,
        private router: Router,
        // need to create class when home component was init
        private themeService: ThemeManager
    ) {}

    ngOnInit(): void {
        // tslint:disable-next-line:no-console
        console.log(this.themeService.current);
        this.routerNavigationEnd$ = this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd),
            map(() => true),
            take(1),
            untilDestroyed(this)
        );

        this.screenSizeController.init();
        this.isMobileScreen$ = this.screenSizeController.screenSize$.pipe(
            map((screenSize: ScreenSize) => screenSize === ScreenSize.MOBILE)
        );
    }

    isRoot(): boolean {
        return this.router.url === '/';
    }

    brandType(): BrandType {
        return this.isRoot() ? BrandType.invert : BrandType.normal;
    }
}
