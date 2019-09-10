import { Component } from '@angular/core';

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

    testEnvironmentRouterLink = this.paymentsService.testEnvironmentRouterLink;
    hasTestEnvironment$ = this.paymentsService.hasTestEnvironment$;

    actionLabel$ = this.paymentsService.actionLabel$;
    actionRouterLink$ = this.paymentsService.actionRouterLink$;

    subheading$ = this.paymentsService.subheading$;

    constructor(private paymentsService: PaymentsService) {}
}
