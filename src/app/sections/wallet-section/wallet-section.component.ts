import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import negate from 'lodash-es/negate';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Component({
    templateUrl: 'wallet-section.component.html',
    styleUrls: ['../main-sections.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletSectionComponent {
    isLaptopScreen$: Observable<boolean>;

    constructor(breakpointObserver: BreakpointObserver) {
        this.isLaptopScreen$ = breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .pipe(pluck('matches'), map(negate(Boolean)));
    }
}
