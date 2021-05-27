import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map, pluck } from 'rxjs/operators';

import { PaymentSectionService } from './payment-section.service';

@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['../main-sections.scss'],
    providers: [PaymentSectionService],
})
export class PaymentSectionComponent {
    isTestEnvBannerVisible$ = this.paymentSectionService.isTestEnvBannerVisible$;

    isNotXSmallSmall$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
        pluck('matches'),
        map((matches) => !matches)
    );

    constructor(private paymentSectionService: PaymentSectionService, private breakpointObserver: BreakpointObserver) {}

    close(): void {
        this.paymentSectionService.close();
    }
}
