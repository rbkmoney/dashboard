import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { ScreenSize, ScreenSizeControlService } from '@dsh/app/shared';

import { PaymentSectionService } from './payment-section.service';

@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['../main-sections.scss'],
    providers: [PaymentSectionService],
})
export class PaymentSectionComponent {
    isTestEnvBannerVisible$ = this.paymentSectionService.isTestEnvBannerVisible$;

    isLaptopScreen$ = this.screenSizeController.screenSize$.pipe(
        map((screenSize: ScreenSize) => screenSize === ScreenSize.LAPTOP)
    );

    constructor(
        private paymentSectionService: PaymentSectionService,
        private screenSizeController: ScreenSizeControlService
    ) {}

    close() {
        this.paymentSectionService.close();
    }
}
