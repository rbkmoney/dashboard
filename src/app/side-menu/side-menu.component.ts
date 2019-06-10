import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'dsh-side-menu',
    templateUrl: 'side-menu.component.html',
    styleUrls: ['side-menu.component.scss']
})
export class SideMenuComponent {
    @HostBinding('class.dsh-side-menu') root = true;
}
