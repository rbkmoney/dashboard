import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, mapTo, startWith } from 'rxjs/operators';

import { ConfigService } from '../config';
import { ThemeManager } from '../theme-manager';

@Component({
    selector: 'dsh-container',
    templateUrl: 'container.component.html',
    styleUrls: ['container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {
    routerNavigationEnd$ = this.router.events.pipe(
        filter((e) => e instanceof NavigationEnd),
        mapTo(true),
        startWith(false),
        distinctUntilChanged()
    );

    get imageUrls() {
        return this.configService.theme.backgroundImageUrls;
    }

    get hasBackground() {
        return this.router.url === '/' && this.themeManager.hasMainBackground;
    }

    constructor(private router: Router, private configService: ConfigService, private themeManager: ThemeManager) {}
}
