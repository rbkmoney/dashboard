import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    templateUrl: 'wallet-section.component.html',
    styleUrls: ['../main-sections.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletSectionComponent {
    isLaptopScreen$ = new BehaviorSubject<boolean>(true);

    constructor(breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe((result) => {
            if (result.matches) {
                this.isLaptopScreen$.next(false);
            } else {
                this.isLaptopScreen$.next(true);
            }
        });
    }
}
