import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-mobile-menu-nav-item',
    templateUrl: 'mobile-menu-nav-item.component.html',
    styleUrls: ['mobile-menu-nav-item.component.scss'],
})
export class NavItemComponent {
    @Input() active = false;
}
