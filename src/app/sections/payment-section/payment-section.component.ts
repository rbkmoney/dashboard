import { Component } from '@angular/core';

import { PaymentSectionService } from './payment-section.service';

@Component({
    templateUrl: 'payment-section.component.html',
    styleUrls: ['../main-sections.scss'],
    providers: [PaymentSectionService],
})
export class PaymentSectionComponent {
    isActive$ = this.paymentSectionService.isActive$;
    constructor(private paymentSectionService: PaymentSectionService) {}

    close() {
        this.paymentSectionService.close();
    }
}
