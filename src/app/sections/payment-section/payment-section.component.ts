import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PaymentSectionService } from './payment-section.service';

@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['../main-sections.scss'],
    providers: [PaymentSectionService],
})
export class PaymentSectionComponent {
    isTestEnvBannerVisible$ = this.paymentSectionService.isTestEnvBannerVisible$;

    isLaptopScreen$ = new BehaviorSubject<boolean>(true);

    constructor(private paymentSectionService: PaymentSectionService, breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe((result) => {
            if (result.matches) {
                this.isLaptopScreen$.next(false);
            } else {
                this.isLaptopScreen$.next(true);
            }
        });
    }

    close() {
        this.paymentSectionService.close();
    }
}
