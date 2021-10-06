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

    constructor(private paymentsService: PaymentsService) {}

    get iconName(): string {
        switch (this.currentThemeName) {
            case ThemeName.Main:
                return 'bill';
            case ThemeName.PersianGreen:
                return 'bill_persian_green';
            case ThemeName.Solitude:
                return 'bill_solitude';
            default:
                return '';
        }
    }
}
