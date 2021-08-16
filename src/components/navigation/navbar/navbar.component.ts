import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NavbarDirection } from './model';

@Component({
    selector: 'dsh-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
    @Input() direction: NavbarDirection = 'column';
}
