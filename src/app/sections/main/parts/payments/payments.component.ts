import { Component, OnInit } from '@angular/core';

import { PaymentsService } from './payments.service';
import { SpinnerType } from '../../../../spinner';
import { routeEnv } from '../../../route-env';
import { PaymentPartType } from './payment-part-type';
import { ContentConfig } from './content-config';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.scss'],
    providers: [PaymentsService]
})
export class PaymentsComponent implements OnInit {
    actionRouterLink = `/payment-section/env/${routeEnv['1']}/operations`;
    testEnvironmentRouterLink = `/payment-section/env/${routeEnv['0']}/operations`;
    config: ContentConfig;
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    isLoading$ = this.paymentsService.isLoading$;
    hasTestEnvironment$ = this.paymentsService.hasTestEnvironment$;
    hasRealEnvironment$ = this.paymentsService.hasRealEnvironment$;

    constructor(private paymentsService: PaymentsService) {}

    ngOnInit() {
        this.config = this.paymentsService.toContentConfig(PaymentPartType.accepted);
    }
}
