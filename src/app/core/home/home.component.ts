import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { ConfigService } from '../../config';
import { ThemeManager } from '../../theme-manager';
import { ScreenSize } from '../services/screen-size-control/interfaces/screen-size';
import { ScreenSizeControlService } from '../services/screen-size-control/screen-size-control.service';
import { ROOT_ROUTE_PATH } from './navigation/consts';

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
        private configService: ConfigService,
        // need to create class when home component was init
        private themeManager: ThemeManager
    ) {}

    get imageUrls() {
        return this.configService.theme.backgroundImageUrls;
    }

    get hasBackground() {
        return this.router.url === ROOT_ROUTE_PATH && this.themeManager.hasMainBackground;
    }

    ngOnInit(): void {
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
}
