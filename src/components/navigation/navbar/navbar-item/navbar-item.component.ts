import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-navbar-item',
    templateUrl: 'navbar-item.component.html',
    styleUrls: ['navbar-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarItemComponent {
    @Input() icon: string;
    @Input() active = false;
}
