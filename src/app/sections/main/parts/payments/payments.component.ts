import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { PaymentsService } from './payments.service';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.scss'],
    providers: [PaymentsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent {
    spinnerType = SpinnerType.FulfillingBouncingCircle;
    isLoading$ = this.paymentsService.isLoading$;
    actionBtnContent$ = this.paymentsService.actionBtnContent$;
    testEnvBtnContent$ = this.paymentsService.testEnvBtnContent$;
    subheading$ = this.paymentsService.subheading$;

    constructor(private paymentsService: PaymentsService) {}
}
