import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

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
    // @Input() hideContent = false;
    // @Input() iconSize: IconSize = 'md';

    iconSize$: Observable<IconSize> = this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(pluck('matches'))
        .pipe(map((isXSmallSmall) => (isXSmallSmall ? 'lg' : 'md')));

    constructor(private breakpointObserver: BreakpointObserver) {}
}
