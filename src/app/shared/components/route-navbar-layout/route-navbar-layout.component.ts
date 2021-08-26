import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Component({
    selector: 'dsh-route-navbar-layout',
    templateUrl: 'route-navbar-layout.component.html',
    styleUrls: ['route-navbar-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteNavbarLayoutComponent {
    layoutDirection$: Observable<'row' | 'column'> = this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .pipe(pluck('matches'))
        .pipe(map((isXSmallSmall) => (isXSmallSmall ? 'column' : 'row')));

    constructor(private breakpointObserver: BreakpointObserver) {}
}
