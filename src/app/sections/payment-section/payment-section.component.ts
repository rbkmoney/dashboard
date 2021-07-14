import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map, pluck } from 'rxjs/operators';

import { PaymentSectionService } from './payment-section.service';
import { PaymentInstitutionRealmService } from './services/payment-institution-realm/payment-institution-realm.service';
import { RealmShopsService } from './services/realm-shops/realm-shops.service';

@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['../main-sections.scss'],
    providers: [PaymentSectionService, PaymentInstitutionRealmService, RealmShopsService],
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
