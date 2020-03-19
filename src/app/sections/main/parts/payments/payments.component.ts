import { Component } from '@angular/core';

import { SpinnerType } from '../../../../spinner';
import { PaymentsService } from './payments.service';

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

    constructor(private paymentsService: PaymentsService) {}
}
