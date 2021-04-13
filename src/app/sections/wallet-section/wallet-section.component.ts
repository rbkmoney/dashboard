import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, pluck } from 'rxjs/operators';

@Component({
    templateUrl: 'wallet-section.component.html',
    styleUrls: ['../main-sections.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletSectionComponent {
    isNotXSmallSmall$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
        pluck('matches'),
        map((matches) => !matches)
    );

    constructor(private breakpointObserver: BreakpointObserver) {}
}
