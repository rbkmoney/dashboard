import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-nav-item',
    templateUrl: 'nav-item.component.html',
    styleUrls: ['nav-item.component.scss'],
})
export class NavItemComponent {
    @Input() active = false;
}
