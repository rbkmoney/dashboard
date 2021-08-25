import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Withdrawal } from '@dsh/api-codegen/wallet-api';

@Component({
    selector: 'dsh-withdrawal-details',
    templateUrl: 'withdrawal-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithdrawalDetailsComponent {
    @Input() withdrawal: Withdrawal;
}
