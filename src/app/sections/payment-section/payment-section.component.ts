import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ScreenSize, ScreenSizeControlService } from '@dsh/app/shared';

import { PaymentSectionService } from './payment-section.service';

@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['../main-sections.scss'],
    providers: [PaymentSectionService],
})
export class PaymentSectionComponent implements OnInit {
    isTestEnvBannerVisible$ = this.paymentSectionService.isTestEnvBannerVisible$;
    isLaptopScreen$: Observable<boolean>;

    constructor(
        private paymentSectionService: PaymentSectionService,
        private screenSizeController: ScreenSizeControlService
    ) {}

    ngOnInit() {
        this.isLaptopScreen$ = this.screenSizeController.screenSize$.pipe(
            map((screenSize: ScreenSize) => screenSize === ScreenSize.LAPTOP)
        );
    }

    close() {
        this.paymentSectionService.close();
    }
}
