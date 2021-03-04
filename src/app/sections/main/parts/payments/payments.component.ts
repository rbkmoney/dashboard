import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SpinnerType } from '@dsh/components/indicators';

import { ThemeName } from '../../../../theme-manager';
import { PaymentsService } from './payments.service';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    styleUrls: ['payments.component.scss'],
    providers: [PaymentsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent {
    @Input() currentThemeName: ThemeName;
    spinnerType = SpinnerType.FulfillingBouncingCircle;
    isLoading$ = this.paymentsService.isLoading$;
    actionBtnContent$ = this.paymentsService.actionBtnContent$;
    testEnvBtnContent$ = this.paymentsService.testEnvBtnContent$;
    subheading$ = this.paymentsService.subheading$;

    // tslint:disable-next-line:no-console
    log = console.log;

    constructor(private paymentsService: PaymentsService) {}

    get iconName(): string {
        switch (this.currentThemeName) {
            case ThemeName.main:
                return 'bill';
            case ThemeName.persianGreen:
                return 'bill_persian_green';
            default:
                return '';
        }
    }
}
