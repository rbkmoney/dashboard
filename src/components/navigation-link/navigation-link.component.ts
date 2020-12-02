import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-navigation-link',
    templateUrl: 'navigation-link.component.html',
    styleUrls: ['navigation-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationLinkComponent {
    @Input() text: string;
}
