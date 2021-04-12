import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { PaymentSectionService } from './payment-section.service';

@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['../main-sections.scss'],
    providers: [PaymentSectionService],
})
export class PaymentSectionComponent {
    isTestEnvBannerVisible$ = this.paymentSectionService.isTestEnvBannerVisible$;

    isLaptopScreen$: Observable<boolean>;

    constructor(private paymentSectionService: PaymentSectionService, breakpointObserver: BreakpointObserver) {
        this.isLaptopScreen$ = breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
            pluck('matches'),
            map((isMobile) => !isMobile)
        );
    }

    close() {
        this.paymentSectionService.close();
    }
}
