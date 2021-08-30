import { Component, Input } from '@angular/core';

import { NavbarItemConfig } from './model';

@Component({
    selector: 'dsh-route-navbar',
    templateUrl: 'route-navbar.component.html',
    styleUrls: ['route-navbar.component.scss'],
})
export class RouteNavbarComponent {
    @Input() itemConfig: NavbarItemConfig[];
}
