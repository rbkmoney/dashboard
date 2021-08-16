import { Component, Input } from '@angular/core';

import { NavbarItemConfig, NavbarMode, NavbarResponsiveConfig } from './model';
import { toResponsiveConfig } from './utils';

@Component({
    selector: 'dsh-route-navbar',
    templateUrl: 'route-navbar.component.html',
    styleUrls: ['route-navbar.component.scss'],
})
export class RouteNavbarComponent {
    @Input() mode: NavbarMode = 'desktop';
    @Input() itemConfig: NavbarItemConfig[];

    get responsiveConfig(): NavbarResponsiveConfig {
        return toResponsiveConfig(this.mode);
    }
}
