import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { PaymentsService } from './payments.service';
import { SpinnerType } from '../../../../spinner';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.scss'],
    providers: [PaymentsService]
})
export class PaymentsComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;
    isLoading$ = this.paymentsService.isLoading$;
    actionBtnContent$ = this.paymentsService.actionBtnContent$;
    testEnvBtnContent$ = this.paymentsService.testEnvBtnContent$;
    subheading$ = this.paymentsService.subheading$;

    constructor(private paymentsService: PaymentsService, private transloco: TranslocoService) {}

    ngOnInit() {
        this.transloco.selectTranslation('main/ru').subscribe(t => {
            this.config = this.paymentsService.toContentConfig(PaymentPartType.accepted, t);
        });
    }
}
