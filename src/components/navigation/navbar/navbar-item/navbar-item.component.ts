import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IconSize } from './model';

@Component({
    selector: 'dsh-navbar-item',
    templateUrl: 'navbar-item.component.html',
    styleUrls: ['navbar-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarItemComponent {
    @Input() icon: string;
    @Input() active = false;
    @Input() hideContent = false;
    @Input() iconSize: IconSize = 'md';
}
